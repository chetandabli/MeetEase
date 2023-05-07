const {createClient} = require('redis');
require("dotenv").config();
const client = createClient({
    password: process.env.redisClientPassword,
    socket: {
        host: process.env.redisClientHostlink,
        port: process.env.redisClientHost
    }
});
client.on('error', err => console.log('Redis Client Error', err));
try {
    client.connect();
} catch (error) {
    console.log(error)
}
module.exports = {
    client
}