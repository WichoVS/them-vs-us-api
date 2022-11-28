const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Active: {
      type: Boolean,
      required: true,
      default: true,
    },
    Credits: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { versionKey: false }
);

UsersSchema.index({ Username: 1 }, { unique: true });

const User = mongoose.model("Users", UsersSchema);

module.exports = User;
