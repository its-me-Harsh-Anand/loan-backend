var nodemailer = require('nodemailer');
const router = require("express").Router()
const axios = require('axios')

router.route('/sendemail').post((req, res)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD}`
    }
  });
  
  var mailOptions = {
    from: `${process.env.EMAIL}`,
    to: req.body.to,
    subject: 'LoanTark Registration Complete',
    text: req.body.text
  };
  
  transporter.sendMail(mailOptions)
    .then(info => res.json({success : true, info : info}))
    .catch(err => res.json({success : false, error : err}))

})


module.exports = router