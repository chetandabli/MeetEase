const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
    start_time: {
        type: Date, required: true
    },
    end_time: {
        type: Date, required: true
    },
    date: {
        type: Date, required: true
    },
    heading: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    location: {
        type: String, required: true
    },
    is_booked: {
        type: Boolean, default: false
    }, 
    booked_by: {
        type: mongoose.Schema.Types.Mixed, default: ""
    },
    color: {
        type: String, default: "gray"
    }
});

const appointment = mongoose.Schema({

})

const MeetingModel = mongoose.model("meeting", meetingSchema);

module.exports = {
    MeetingModel
}