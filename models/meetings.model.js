const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
    start_time: {
        type: Date, require: true
    },
    end_time: {
        type: Date, require: true
    },
    heading: {
        type: String, require: true
    },
    description: {
        type: String, require: true
    },
    location: {
        type: String, require: true
    },
    is_booked: {
        type: Boolean, require: true, default: false
    }
});

const appointment = mongoose.Schema({
    
})

const meetingModel = mongoose.model("meeting", meetingSchema);

module.exports = {
    meetingModel
}