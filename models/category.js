const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId
    },
    updatedby: {
      type: mongoose.Schema.Types.ObjectId  
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", schema);
