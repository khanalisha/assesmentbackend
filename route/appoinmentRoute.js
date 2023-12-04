const express = require("express");
const { appoinmentModel } = require("../model/appoinmentScheme");

const appoinmentRouter = express.Router();

appoinmentRouter.post("/appoinment", async (req, res) => {
  const {
    name,
    image,
    specialization,
    experience,
    location,
    date,
    slots,
    fee,
  } = req.body;
  try {
    const patient = new appoinmentModel({
      name,
      image,
      specialization,
      experience,
      location,
      date,
      slots,
      fee,
    });

    await patient.save();
    res.status(200).json({ msg: "Data is added to data Base!", patient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  appoinmentRouter,
};
