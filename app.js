const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")
const bodyParser = require('body-parser')

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
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });

// Setting Route
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + "/index.html"))
})


module.exports = app;
