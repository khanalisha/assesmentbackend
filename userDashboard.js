const express = require("express");
require("dotenv").config();

const { userModel } = require("./model/userSchema");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { blackList } = require("./blacklist/blackList");

userRouter.post("/addUser", async (req, res) => {
  const { email, password, Confirm_Password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ msg: "user Email aready exist !try with other email" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        // Store hash in your password DB.
        const user = new userModel({
          ...req.body,
          password: hash,
          Confirm_Password: hash,
        });
        console.log(user);

        await user.save();
        res.send({ msg: "Welcome Home", user });
      });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser, "aa");

    // if (existingUser) {
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userId: existingUser._id },
          process.env.secreatKey
        );
        res
          .status(200)
          .json({ msg: "Login Sucess", token: token, existingUser });
      } else {
        res.status(401).json({ err: err.message });
      }
    });
    // } else {
    //   return res.status(400).json({ message: "Invalid password,Try again" });
    // }
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

userRouter.post("/logOut", (req, res) => {
  const { email } = req.body;
  const token = req.headers.authorization;

  try {
    blackList.push(token);
    res.status(200).json({ msg: `This ${email} User is logOut!` });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
