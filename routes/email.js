var nodemailer = require('nodemailer');
const router = require("express").Router()
const axios = require('axios')

router.route('/sendemail/:id').post((req, res)=>{
    const id = req.params.id

    axios.get(`${process.env.BACKEND_URL}/user/${id}`)
    .then(res => res.data)
    .then(data => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${process.env.EMAIL}`,
              pass: `${process.env.PASSWORD}`
            }
          });
          
          var mailOptions = {
            from: `${process.env.EMAIL}`,
            to: `${data.user_email}`,
            subject: 'LoanTark Registration Complete',
            text: 
            `Dear ${data.user_fname},
            Your application for Business Loan and loan amount ${data.loan_amount} is under process by LoanTark.Your Interest Rate 7.5 % per anumm and EMI ${data.loan_emi} for tenure ${data.loan_tenure} years. Submit all Below Mentioned KYC document earlier
            1.Aadhaar  Card
            2.Pan Card
            3.Self Photograph
            4.Bank Statement
            5.Two References
            For More Information
            Visit http://loantark.org
            Or WhatsApp Us at +19403705935`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
    })

})


module.exports = router