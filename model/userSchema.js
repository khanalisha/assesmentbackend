const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  Confirm_Password: String,
});

const userModel = mongoose.model("HospitalUser", UserSchema);

module.exports = {
  userModel,
};
