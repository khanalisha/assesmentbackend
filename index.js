const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./userDashboard");
const { appoinmentRouter } = require("./route/appoinmentRoute");

// const cors = require("cors");
const app = express();

app.use(express.json());

// app.use(cors());

app.use(userRouter);
app.use(appoinmentRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db is created");
    console.log(`Running ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
