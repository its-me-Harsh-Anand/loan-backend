const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    admin_phone: {
      type: String,
      trim: true,
    },
    admin_whatsapp: {
      type: String,
      trim: true,
    },
    admin_email: {
        type : String,
        trim : true,
    },
    admin_password : {
        type : String,
        trim : true,
    }   
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
