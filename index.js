const express = require("express");
const app = express();
const {connection} = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  app.use(express.static(path.join(__dirname, "public", "index.html")));
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
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
