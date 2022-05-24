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
      to: req.body.to //put here your twillio verified number with country code, for ex:(+918234567890), in order to get message
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
  
});

router.route("/sendwhatsapp/:id").post((req, res) => {
  const id = req.params.id;
  req.header("Access-Control-Allow-Origin", "true");
  res.header("Content-Type", "application/json");
  axios
    .get(`${process.env.BACKEND_URL}/user/${id}`)
    .then((res) => res.data)
    .then((data) => {
      client.messages
        .create({
          body: `Dear ${data.user_fname},
            Your application for Business Loan and loan amount ${data.loan_amount} is under process by LoanTark.Your Interest Rate 7.5 % per anumm and EMI ${data.loan_emi} for tenure ${data.loan_tenure} years. Submit all Below Mentioned KYC document earlier
            1.Aadhaar  Card
            2.Pan Card
            3.Self Photograph
            4.Bank Statement
            5.Two References
            For More Information
            Visit http://loantark.org
            Or WhatsApp Us at +19403705935`,
          from: "whatsapp:+19403705935",
          to: `whatsapp:+91${data.user_mobile}`, //put here your twillio verified number with country code, for ex:(+918234567890), in order to get message
        })
        .then((message) => console.log(message))
        .catch((err) => console.error(err));
    })
    .catch((err) => res.json(err));
});
module.exports = router;
