const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String, require: true
    },
    email: {
        type: String, require: true
    },
    meetings: {
        type: Array, require: true, default: []
    },
    appointments: {
        type: Array, require: true, default: []
    },
    picture: {
        type: String, require: true
    }
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
    userModel
}