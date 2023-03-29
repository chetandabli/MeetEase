const {MeetingModel} = require("../models/meetings.model");
const {Usermodel} = require("../models/user.model");
const express = require('express');
const meetingRouter= express.Router();
const {auth} = require("../middleware/authenticate");
const {client} = require("../config/redis");

meetingRouter.use(auth);

meetingRouter.get("/", async(req, res)=>{
    try {
        let data= await MeetingModel.find()
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
});

meetingRouter.post("/", async(req, res)=>{
    const {start_time, end_time, date, heading, description, location, color, user_id} = req.body;
    try {
        let newMeeting = new MeetingModel({start_time, end_time, date, heading, description, location, color})
        await newMeeting.save();
        await Usermodel.findByIdAndUpdate(
            user_id,
            { $push: { meetings: newMeeting._id } }
        );
        res.send("Meeting Created")
    } catch (error) {
        console.log(error);
        res.send({error: error.message})
    }
});

module.exports = {
    meetingRouter
}
