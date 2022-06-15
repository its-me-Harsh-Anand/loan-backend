const { generateApproval } = require('../controllers/approvalLetter')
const path = require('path')
var nodemailer = require('nodemailer');
const fs = require('fs');
const { generateAgreement } = require('../controllers/agreementLetter');
const  router = require('express').Router()


// Router for sending Approval Letter
router.route('/send-approval-letter').post(async (req, res)=>{
    if(req.body.auth_id !== process.env.ADMIN_AUTH_ID){
        res.status(404).send(`<strong>You have no access to this server<strong>`)
        return
    }

    const user = req.body.user

    await generateApproval(user)
    const pathtofile = path.join(__dirname, `../controllers/${user.user_mobile}-approval-letter.pdf`)

     var transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`
        }
      });
      
       var mailOptions = await {
        from: `${process.env.EMAIL}`,
        to: req.body.to,
        subject: 'Approval Letter',
        text: `
        Dear ${user.user_fname},
        Your application for ${user.loan_type} and loan amount ${user.loan_amount} is under process by LoanTark.Your Interest Rate 7.5 % per anumm and EMI ${user.loan_emi} for tenure ${user.loan_tenure} years. Submit all Below Mentioned KYC document earlier
        1.Aadhaar  Card
        2.Pan Card
        3.Self Photograph
        4.Bank Statement
        5.Two References
        For More Information
        Visit http://loan-omega.vercel.app
        Or WhatsApp Us at 1234567890
        `,
        attachments: [
            {
                filename: `${user.user_mobile}-approval-letter.pdf`,
                path: pathtofile
            }
        ]
      };
      
      await transporter.sendMail(mailOptions)
        .then(info => res.json({success : true, info : info}))
        .catch(err => res.json({success : false, error : err}))
        .finally(async ()=>{
            const pathtohtml = path.join(__dirname, `../controllers/approval.html`)
            const pathtopdf = path.join(__dirname, `../controllers/${(user.user_mobile).toString()}-approval-letter.pdf`)
            await fs.unlink(pathtohtml, function(err){
                if(err) return console.log(err);
                console.log('HTML file deleted successfully');
            })
            await fs.unlink(pathtopdf, function(err){
                if(err) return console.log(err);
                console.log('PDF file deleted successfully');
            })
        })

    
})



// Route for sending Agreement Letter
router.route('/send-agreement-letter').post(async (req, res)=>{
    if(req.body.auth_id !== process.env.ADMIN_AUTH_ID){
        res.status(404).send(`<strong>You have no access to this server<strong>`)
        return
    }

    const user = req.body.user

    await generateAgreement(user)
    const pathtofile = path.join(__dirname, `../controllers/${user.user_mobile}-approval-letter.pdf`)

     var transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`
        }
      });
      
       var mailOptions = await {
        from: `${process.env.EMAIL}`,
        to: req.body.to,
        subject: 'Agreement Letter',
        text: `
        Dear ${user.user_fname},
        Your application for ${user.loan_type} and loan amount ${user.loan_amount} is under process by LoanTark.Your Interest Rate 7.5 % per anumm and EMI ${user.loan_emi} for tenure ${user.loan_tenure} years. Submit all Below Mentioned KYC document earlier
        1.Aadhaar  Card
        2.Pan Card
        3.Self Photograph
        4.Bank Statement
        5.Two References
        For More Information
        Visit http://loan-omega.vercel.app
        Or WhatsApp Us at 1234567890
        `,
        attachments: [
            {
                filename: `${user.user_mobile}-agreement-letter.pdf`,
                path: pathtofile
            }
        ]
      };
      
      await transporter.sendMail(mailOptions)
        .then(info => res.json({success : true, info : info}))
        .catch(err => res.json({success : false, error : err}))
        .finally(async ()=>{
            const pathtohtml = path.join(__dirname, `../controllers/agreement.html`)
            const pathtopdf = path.join(__dirname, `../controllers/${(user.user_mobile).toString()}-agreement-letter.pdf`)
            await fs.unlink(pathtohtml, function(err){
                if(err) return console.log(err);
                console.log('HTML file deleted successfully');
            })
            await fs.unlink(pathtopdf, function(err){
                if(err) return console.log(err);
                console.log('PDF file deleted successfully');
            })
        })

})





module.exports = router

