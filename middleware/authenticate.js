const {client} = require("../config/redis");
const jwt = require('jsonwebtoken');

const auth = async(req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(token){
        const x = await client.LRANGE("blacklist", 0, -1);
        if(x.includes(token)){
            res.status(401).json({"msg": "please login again token is blacklisted"})
        }else{
            jwt.verify(token, process.env.privateKey, function(err, decoded) {
                if(err){
                    res.status(401).json({"msg": err.message})
                }else{
                    req.body.user_id = decoded.user_id;
                    next()
                }
              });
        }
    }else{
        res.status(401).json({"msg": "token must be provided in headers"})
    }
}

module.exports= {
    auth
}