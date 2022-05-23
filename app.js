const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Connecting to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(`Mongodb connected...`);
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import Route
app.use("/verify", require("./routes/verify"));
app.use("/user", require("./routes/user"));
app.use("/message", require("./routes/message"));
app.use("/email", require("./routes/email"))

module.exports = app;
