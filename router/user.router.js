const { Usermodel } = require("../models/user.model");
const express = require("express");
const userRouter = express.Router();
const { client } = require("../config/redis");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { auth } = require("../middleware/authenticate");
const mongoose = require("mongoose");

userRouter.get("/meetings", auth, async (req, res) => {
  const { user_id } = req.body;
  let id = new mongoose.Types.ObjectId(user_id);
  try {
    const userData = await Usermodel.aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: "meetings",
          localField: "meetings",
          foreignField: "_id",
          as: "meetingsData",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          meetingsData: 1,
          appointments: 1,
          picture: 1,
        },
      },
    ]);
    res.send(userData);
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});
userRouter.get("/meetings/:when", auth, async (req, res) => {
  const when = req.params.when;
  const { user_id } = req.body;
  let id = new mongoose.Types.ObjectId(user_id);
  try {
    if (when == "upcoming") {
      const userData = await Usermodel.aggregate([
        {
          $match: { _id: id },
        },
        {
          $lookup: {
            from: "meetings",
            localField: "meetings",
            foreignField: "_id",
            as: "meetingsData",
          },
        },
        {
          $addFields: {
            futureMeetings: {
              $filter: {
                input: "$meetingsData",
                as: "meeting",
                cond: {
                  $gt: ["$$meeting.start_time", new Date()],
                },
              },
            },
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            futureMeetings: 1,
            appointments: 1,
            picture: 1,
          },
        },
      ]);
      res.send(userData);
    } else if (when == "ended") {
      const userData = await Usermodel.aggregate([
        {
          $match: { _id: id },
        },
        {
          $lookup: {
            from: "meetings",
            localField: "meetings",
            foreignField: "_id",
            as: "pastMeetingsData",
          },
        },
        {
          $addFields: {
            pastMeetingsData: {
              $filter: {
                input: "$pastMeetingsData",
                as: "meeting",
                cond: {
                  $lt: ["$$meeting.end_time", new Date()],
                },
              },
            },
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            pastMeetingsData: 1,
            appointments: 1,
            picture: 1,
          },
        },
      ]);
      res.send(userData);
    } else if (when == "live") {
      const currentDate = new Date();
      const userData = await Usermodel.aggregate([
        {
          $match: { _id: id },
        },
        {
          $lookup: {
            from: "meetings",
            localField: "meetings",
            foreignField: "_id",
            as: "meetingsData",
          },
        },
        {
          $addFields: {
            currentMeetings: {
              $filter: {
                input: "$meetingsData",
                as: "meeting",
                cond: {
                  $and: [
                    { $lte: ["$$meeting.start_time", currentDate] },
                    { $gte: ["$$meeting.end_time", currentDate] },
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            pastMeetings: 1,
            futureMeetings: 1,
            currentMeetings: 1,
            picture: 1,
          },
        },
      ]);

      res.send(userData);
    }
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});

userRouter.get("/:userid", async(req, res)=>{
  const meetingOwner = req.params.userid;
  let id = new mongoose.Types.ObjectId(meetingOwner);
  try {
    const meetingsData = await Usermodel.aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: "meetings",
          localField: "meetings",
          foreignField: "_id",
          as: "meetingsData",
        },
      },
      {
        $addFields: {
          futureMeetings: {
            $filter: {
              input: "$meetingsData",
              as: "meeting",
              cond: {
                $gt: ["$$meeting.start_time", new Date()],
              },
            },
          },
        },
      },
      {
        $sort: {
          "futureMeetings.start_time": 1
        }
      },
      {
        $project: {
          name: 1,
          futureMeetings: 1,
          picture: 1,
        },
      },
    ]);
    let userData = meetingsData[0]
    res.render("book", {data: userData});
  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
})

userRouter.get("/logout", async (req, res) => {
  try {
    await client.LPUSH("blacklist", req.headers.authorization.split(" ")[1]);
    await client.LPUSH("rblacklist", req.headers.authorization.split(" ")[3]);
    res.status(200).json({ msg: "you are logged out" });
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/refresh", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const x = await client.LRANGE("blacklist", 0, -1);
  if (x.includes(token)) {
    res.status(401).json({
      msg: "please login again refresh token is blacklisted, you hacker!",
    });
  } else {
    jwt.verify(token, process.env.rprivateKey, function (err, decoded) {
      if (err) {
        res.status(400).json({
          massage: "refresh token is also rexpired! please login again",
          err: err,
        });
      } else {
        const normalToken = jwt.sign(
          { user_id: decoded.user_id },
          process.env.privateKey,
          { expiresIn: 60 }
        );
        const refreshToken = jwt.sign(
          { user_id: decoded.user_id },
          process.env.rprivateKey,
          { expiresIn: 300 }
        );
        res.status(200).json({ token: normalToken, rtoken: refreshToken });
      }
    });
  }
});
module.exports = {
  userRouter,
};
