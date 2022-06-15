const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")
const bodyParser = require('body-parser');
const { generateApproval } = require("./controllers/approvalLetter");

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
app.use('/static',express.static('static'))


//Import Route
app.use("/verify", require("./routes/verify"));
app.use("/user", require("./routes/user"));
app.use("/message", require("./routes/message"));
app.use("/email", require("./routes/email"))
app.use("/admin", require("./routes/admin"))
app.use("/pdf", require("./routes/pdf"))
// app.use("/pdf", require("./routes/pdf"))

// Setting Route
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + "/index.html"))
})

module.exports = app;
