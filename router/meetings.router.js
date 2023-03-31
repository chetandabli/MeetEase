const { MeetingModel } = require("../models/meetings.model");
const { Usermodel } = require("../models/user.model");
const express = require("express");
const meetingRouter = express.Router();
const { auth } = require("../middleware/authenticate");
const { client } = require("../config/redis");

meetingRouter.use(auth);

meetingRouter.get("/", async (req, res) => {
  try {
    let data = await MeetingModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

meetingRouter.post("/", async (req, res) => {
  let {
    start_time,
    end_time,
    date,
    heading,
    description,
    location,
    color,
    user_id,
  } = req.body;
  if(!color){
    let x = Math.floor(Math.random() * 11);
    const colors = ['white', 'black', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'gray', 'pink'];
    color = colors[x]
  }
  try {
    let newMeeting = new MeetingModel({
      start_time,
      end_time,
      date,
      heading,
      description,
      location,
      color,
      created_by: user_id
    });
    await newMeeting.save();
    await Usermodel.findByIdAndUpdate(user_id, {
      $push: { meetings: newMeeting._id },
    });
    res.send("Meeting Created");
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

meetingRouter.post("/book/:meetingId", async (req, res) => {
  const { meetingId } = req.params;
  const { user_id } = req.body;

  try {
    const meeting = await MeetingModel.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    if (meeting.created_by === user_id) {
      return res
        .status(400)
        .json({ message: "You cannot book your own meeting" });
    }
    if (meeting.is_booked) {
      return res
        .status(400)
        .json({ message: "You cannot book already booked meeting" });
    }

    await MeetingModel.findByIdAndUpdate(meetingId, {
      is_booked: true,
      booked_by: user_id,
    });

    await Usermodel.findByIdAndUpdate(
      user_id,
      { $push: { appointments: meetingId } }
    );

    res.status(200).json({ message: "Meeting booked successfully!" });
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

meetingRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const meeting = await MeetingModel.findById(id);

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    if (meeting.created_by !== user_id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const deletedMeeting = await MeetingModel.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

      await Usermodel.findByIdAndUpdate(
      user_id,
      { $pull: { meetings: id } }
    );

    res.status(200).json({ message: 'Meeting deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = {
  meetingRouter,
};
