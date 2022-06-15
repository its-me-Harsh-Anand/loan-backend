const axios = require('axios')
const FormData = require('form-data')
const path = require('path')
const mustache = require("mustache");
const fs = require("fs");

const pathToUtils = path.join(__dirname, 'utils')

const page = fs.readFileSync(`${pathToUtils}/agreement.html`).toString();

const d = new Date();
let date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

const day = d.getDate();
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthN = d.getMonth + 1;
const monthName = month[d.getMonth()];
const year = d.getFullYear();

exports.generateAgreement =  (user) => { //provide user in this function whenever you route to /send-approval


  const data = {
    user_fname : user.user_fname,
    user_mobile : user.user_mobile,
    user_address : user.user_address,
    user_email : user.user_email,
    pincode : user.pincode,
    dist : user.dist,
    state : user.state,
    loan_amount : user.loan_amount,
    doc_id : user.user_mobile.slice(3, 9),
    kyc_adhr_no : user.kyc_adhr_no,
    kyc_pan_no : user.kyc_pan_no,
    bank_acc_holder_name : user.bank_acc_holder_name,
    bank_acc_no : user.bank_acc_no,
    bank_ifsc : user.bank_ifsc,
    bank_name : user.bank_name,
    loan_emi : user.loan_emi,
    loan_amount : user.loan_amount,
    date : date,
    day : day,
    monthName : monthName,
    year : year,
    monthN : monthN
  }
  const outputHTML =  mustache.render(page, data);

   fs.writeFileSync(`${__dirname}/agreement.html`, outputHTML)


const formData = new FormData()
formData.append('instructions', JSON.stringify({
  parts: [
    {
      html: "agreement.html",
      assets: [
        "logo.jpeg",
        "approved.png",
        "stamp.jpg"
      ]
    }
    
  ]
}))
formData.append('agreement.html', fs.createReadStream(`${__dirname}/agreement.html`))
formData.append('logo.jpeg', fs.createReadStream(`${pathToUtils}/logo.jpeg`))
formData.append('stamp.jpg', fs.createReadStream(`${pathToUtils}/stamp.jpg`))
formData.append('approved.png', fs.createReadStream(`${pathToUtils}/approved.png`))

;(async () => {
  try {
    const response = await axios.post('https://api.pspdfkit.com/build', formData, {
      headers: formData.getHeaders({
          'Authorization': `${process.env.PSPDFKIT_AUTH}`
      }),
      responseType: "stream"
    })

    response.data.pipe(fs.createWriteStream(`${__dirname}/${(user.user_mobile).toString()}-agreement-letter.pdf`))
  } catch (e) {
    const errorString = await streamToString(e.response.data)
    console.log(errorString)
  }
})()

function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on("error", (err) => reject(err))
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
  })
}
}

