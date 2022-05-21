const router = require("express").Router();

let User = require("../models/user.model");

// Finding user by username

router.route("/username/:username").get((req, res) => {
  findUser(req.params.username, (err, user) => {
    if (user) {
      res.json({ messsage: "User found", stat: true, user: user });
    } else {
      res.json({ message: "User not found", stat: false, error: err });
    }
  });
});

// Registering new user

router.route("/register").post(async (req, res) => {
  const user_fname = req.body.user_fname;
  const user_mobile = req.body.user_mobile;
  const password = req.body.user_otp;
  const kyc_adhr_no = "";
  const kyc_pan_no = "";
  const whatsapp_no = "";
  const user_email = "";
  const user_address = "";
  const pincode = "";
  const dist = "";
  const state = "";
  const loan_amount = "";
  const loan_registration_fee = "";
  const loan_tenure = "";
  const loan_type = "";
  const loan_interest_rate = "";
  const loan_emi = "";
  const bank_name = "";
  const bank_acc_holder_name = "";
  const bank_acc_no = "";
  const bank_ifsc = "";

  const newUser = await new User({
    user_fname,
    user_mobile,
    password,
    kyc_adhr_no,
    kyc_pan_no,
    whatsapp_no,
    user_email,
    user_address,
    pincode,
    dist,
    state,
    loan_amount,
    loan_registration_fee,
    loan_tenure,
    loan_type,
    loan_interest_rate,
    loan_emi,
    bank_name,
    bank_acc_holder_name,
    bank_acc_no,
    bank_ifsc
  });

  newUser
    .save()
    .then((user) =>
      res.json({
        message: "Thanks for registering with us",
        stat: true,
        id: user._id,
      })
    )
    .catch((err) =>{
      res.status(400).json(err)
      console.log(err)
    }
    );
});

// Function for finding existing user
function findUser(username, callback) {
  User.findOne({ username: username }, function (err, userObj) {
    if (err) {
      return callback(err);
    } else if (userObj) {
      return callback(null, userObj);
    } else {
      return callback();
    }
  });
}

module.exports = router;
