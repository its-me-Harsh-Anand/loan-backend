const router = require("express").Router();

let User = require("../models/user.model");

router.route("/all").get((req, res)=>{
  if(req.query.auth_id !== process.env.ADMIN_AUTH_ID){
    res.json({message: "You are not allowed to get Credentials"})
    return
  }
  User.find()
    .then(users=> res.json(users))
    .catch(err => res.json({messsage: "Fetching all users failed", stat: "false", error: err}))
})

// Finding user by number

router.route("/mobile/:number").get((req, res) => {
  findUser(req.params.number, (err, user) => {
    if (user) {
      res.json({
        messsage: "User found",
        stat: true,
        user: user,
      });
    } else {
      res.json({ message: "User not found", stat: false, error: err });
    }
  });
});

// Finding user by id
router.route('/:id').get((req, res)=>{
  User.findById(req.params.id)
  .then(user => {
    const returnUser = {
      user_fname : user.user_fname,
      user_mobile : user.user_mobile,
      user_email : user.user_email,
      loan_amount : user.loan_amount,
      loan_registration_fee : user.loan_registration_fee,
      loan_tenure : user.loan_tenure,
      loan_type : user.loan_type,
      loan_interest_rate : user.loan_interest_rate,
      loan_emi : user.loan_emi,
    }
    return res.json(returnUser)
  })
  .catch(err => res.json({message: "User not found", stat: false, error: err}))
})

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
    bank_ifsc,
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
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

// Updating step-1 of Loan
router.route("/update/step1/:id").post((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
      (user.kyc_adhr_no = req.body.kyc_adhr_no),
        (user.kyc_pan_no = req.body.kyc_pan_no);

      user
        .save()
        .then(() => res.json({ message: "Step 1 updated", stat : true }))
        .catch((err) =>
          res.json({
            message: "Error while updating step 1",
            error: err,
            stat: false,
          })
        );
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "Error in finding user while updating step 1",
        stat: false,
        error: err,
      });
    });
});

// Updating step-2 of Loan
router.route("/update/step2/:id").post((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
      (user.user_fname = req.body.user_fname),
        (user.whatsapp_no = req.body.whatsapp_no),
        (user.user_email = req.body.user_email),
        (user.user_address = req.body.user_address),
        (user.pincode = req.body.pincode),
        (user.dist = req.body.dist),
        (user.state = req.body.state);

      user
        .save()
        .then(() => res.json({ message: "Step 2 updated" , stat: true}))
        .catch((err) =>
          res.json({
            message: "Error while updating step 2",
            error: err,
            stat: false,
          })
        );
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "Error in finding user while updating step 2",
        stat: false,
        error: err,
      });
    });
});



// Updating step-3 of Loan
router.route("/update/step3/:id").post((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
        user.loan_amount = req.body.loan_amount
        user.loan_registration_fee = req.body.loan_registration_fee
        user.loan_tenure = req.body.loan_tenure
        user.loan_type = req.body.loan_type
        user.loan_interest_rate = req.body.loan_interest_rate
        user.loan_emi = req.body.loan_emi

      user
        .save()
        .then(() => res.json({ message: "Step 3 updated" , stat: true}))
        .catch((err) =>
          res.json({
            message: "Error while updating step 3",
            error: err,
            stat: false,
          })
        );
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "Error in finding user while updating step 3",
        stat: false,
        error: err,
      });
    });
});

// Updating step-4 of Loan
router.route("/update/step4/:id").post((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
        user.bank_name = req.body.bank_name
        user.bank_acc_holder_name = req.body.bank_acc_holder_name
        user.bank_ifsc = req.body.bank_ifsc
        user.bank_acc_no = req.body.bank_acc_no

      user
        .save()
        .then(() => res.json({ message: "Step 4 updated" , stat: true}))
        .catch((err) =>
          res.json({
            message: "Error while updating step 4",
            error: err,
            stat: false,
          })
        );
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "Error in finding user while updating step 4",
        stat: false,
        error: err,
      });
    });
});






// Function for finding existing user
function findUser(number, callback) {
  User.findOne({ user_mobile: number }, function (err, userObj) {
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
