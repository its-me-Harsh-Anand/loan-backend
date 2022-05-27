const axios = require("axios");
const cors = require("cors");

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const router = require("express").Router();

router.route("/sendmessage").post((req, res) => {
    res.header('Content-Type', 'application/json')
    client.messages
    .create({
      body: req.body.body,
      from: "+19403705935",
      to: `+91${req.body.to}`
    })
    .then((res) => {
      res.send(JSON.stringify({ success: true, info : res.data }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false, info : err }));
    });
  
});

router.route("/sendwhatsapp").post((req, res) => {
  res.header('Content-Type', 'application/json')
    client.messages
    .create({
      body: req.body.body,
      from: "whatsapp:+19403705935",
      to: `whatsapp:+91${req.body.to}`
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});
module.exports = router;
