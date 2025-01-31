const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  uniqueid: {
    type: String,
    default: () => Math.floor(10000 + Math.random() * 900000),
  },
  contactNumber: {
    type: Number,
  },
  isBlocked: {
    type: Boolean,
    default:false
  },
  isDeleted: {
    type: Boolean,
    default:false
  },
});

module.exports = mongoose.model("users", userschema);
