const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user_fname: {
      type: String,
      trim: true,
    },
    user_mobile: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    kyc_adhr_no: {
      type: String,
      trim: true,
      unique: true,
    },
    kyc_pan_no: {
      type: String,
      trim: true,
      unique: true
    },
    whatsapp_no: {
      type: String,
      trim: true,
    },
    user_email: {
      type: String,
      trim: true,
    },
    user_address: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    dist: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    loan_amount: {
      type: String,
      trim: true,
    },
    loan_registration_fee: {
      type: String,
      trim: true,
    },
    loan_tenure: {
      type: String,
      trim: true,
    },
    loan_type: {
      type: String,
      trim: true,
    },
    loan_interest_rate: {
      type: String,
      trim: true,
    },
    loan_emi: {
      type: String,
      trim: true,
    },
    bank_name: {
      type: String,
      trim: true,
    },
    bank_acc_holder_name: {
      type: String,
      trim: true,
    },
    bank_acc_no: {
      type: String,
      trim: true,
    },
    bank_ifsc: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
