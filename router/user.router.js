const {Usermodel} = require("../models/user.model");
const express = require("express")
const userRouter = express.Router();
const {client} = require("../config/redis");
const jwt = require('jsonwebtoken');
require('dotenv').config();


userRouter.get("/logout", async(req, res)=>{
    try {
        await client.LPUSH("blacklist", req.headers.authorization.split(" ")[1]);
        res.status(200).json({"msg": "you are logged out"})
    } catch (error) {
        console.log(error)
    }
})

userRouter.get("refresh", (req, res)=>{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.rprivateKey, function(err, decoded) {
        if(err){
            res.status(400).json({massage: "refresh token is also rexpired! please login again", err: err})
        }else{
            const normalToken = jwt.sign({"user_id": decoded.user_id}, process.env.privateKey, { expiresIn: 60 });
            const refreshToken = jwt.sign({"user_id": decoded.user_id}, process.env.rprivateKey, { expiresIn: 300 });
            res.status(200).json({token: normalToken, rtoken: refreshToken})
        }
    });
})
module.exports = {
    userRouter
}