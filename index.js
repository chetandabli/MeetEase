const express = require("express");
const app = express();
const {connection} = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const privateKey = process.env.privateKey;
const rprivateKey = process.env.rprivateKey;
const {passport} = require("./config/google-oauth");
const jwt = require('jsonwebtoken');
const {meetingRouter} = require("./router/meetings.router")
const bodyParser = require("body-parser");
const {client} = require("./config/redis")
const {userRouter} = require("./router/user.router")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static("./public"))
 
app.get("/", (req, res) => {
  app.use(express.static(path.join(__dirname, "public", "index.html", "signup.html")));
  res.sendFile(path.resolve(__dirname, "public", "index.html", "signup.html"));
});

app.use("/meeting", meetingRouter);
app.use("/user", userRouter);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    const token = jwt.sign({ user_id: req.user._id }, privateKey, { expiresIn: 2000 });
    const rtoken = jwt.sign({ user_id: req.user._id }, rprivateKey, { expiresIn: 3000 });
    res.redirect(`/?token=${token}&rtoken=${rtoken}`);
    
});


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log(error.message);
  }
  console.log("listening on *:" + process.env.PORT);
});
