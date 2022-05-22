const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
exports.sendMessage = async (req, res) => {

    
client.messages.create({
    body: `Dear ${req.query.user_fname}, <br>
    Your application for ${req.query.loan_type} and loan amount ${req.query.loan_amount} is under process by LoanTark.Your Interest Rate ${req.query.interest_rate} % per anumm and EMI ${req.query.emi} for tenure ${req.query.months} months. Submit all Below Mentioned KYC document earlier <br>
    1.Aadhaar  Card <br>
    2.Pan Card <br>
    3.Self Photograph <br>
    4.Bank Statement <br>
    5.Two References <br>
    For More Information <br>
    Visit http://loantark.org <br>
    Or WhatsApp Us at 9163513964`,
    from:  `+91${req.query.admin_no}`, 
    to: `+91${req.query.user_mobile}`
})
.then(message => console.log(message))
.catch(err => console.error(err))
    
}
