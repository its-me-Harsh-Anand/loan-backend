const axios = require('axios')
const cors = require('cors')

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
const router = require("express").Router()




router.route('/sendmessage/:id').post( cors(), (req, res)=>{
    const id = req.params.id

    axios.get(`${process.env.BACKEND_URL}/user/${id}`)
    .then(res => res.data)
    .then(data => {
        client.messages.create({
            body: 
            `Dear ${data.user_fname},
            Your application for Business Loan and loan amount ${data.loan_amount} is under process by LoanTark.Your Interest Rate 7.5 % per anumm and EMI ${data.loan_emi} for tenure ${data.loan_tenure} years. Submit all Below Mentioned KYC document earlier
            1.Aadhaar  Card
            2.Pan Card
            3.Self Photograph
            4.Bank Statement
            5.Two References
            For More Information
            Visit http://loantark.org
            Or WhatsApp Us at +19403705935`,
            from:  "+19403705935", 
            to: `+91${data.user_mobile}`  //put here your twillio verified number with country code, for ex:(+918234567890), in order to get message
        })
        .then(message => console.log(message))
        .catch(err => console.error(err))
    })

})

router.route('/sendwhatsapp/:id').post((req, res)=>{
    const id = req.params.id

    axios.get(`${process.env.BACKEND_URL}/user/${id}`)
    .then(res => res.data)
    .then(data => {
        client.messages.create({
            body: 
            `Dear ${data.user_fname},
            Your application for Business Loan and loan amount ${data.loan_amount} is under process by LoanTark.Your Interest Rate 7.5 % per anumm and EMI ${data.loan_emi} for tenure ${data.loan_tenure} years. Submit all Below Mentioned KYC document earlier
            1.Aadhaar  Card
            2.Pan Card
            3.Self Photograph
            4.Bank Statement
            5.Two References
            For More Information
            Visit http://loantark.org
            Or WhatsApp Us at +19403705935`,
            from:  "whatsapp:+19403705935", 
            to: `whatsapp:+91${data.user_mobile}`  //put here your twillio verified number with country code, for ex:(+918234567890), in order to get message
        })
        .then(message => console.log(message))
        .catch(err => console.error(err))
    })

})
module.exports = router