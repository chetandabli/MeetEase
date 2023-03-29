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


app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

app.get("/", (req, res) => {
  app.use(express.static(path.join(__dirname, "public", "index.html", "signup.html")));
  res.sendFile(path.resolve(__dirname, "public", "index.html", "signup.html"));
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    const token = jwt.sign({ userID: req.user._id }, privateKey, { expiresIn: 60 });
    const rtoken = jwt.sign({ userID: req.user._id }, rprivateKey, { expiresIn: 300 });
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
