const mongoose = require("mongoose");

const appoinmentSchema = mongoose.Schema({
  name: String,
  image: String,
  specialization: String,
  experience: String,
  location: String,
  date: String,
  slots: String,
  fee: String,
});

const appoinmentModel = mongoose.model("UserAppoinment", appoinmentSchema);
module.exports = {
  appoinmentModel,
};
