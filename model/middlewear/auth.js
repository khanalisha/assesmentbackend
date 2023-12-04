const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, process.env.secreatKey, function (err, decoded) {
      if (decoded) {
        {
          req.body.userID = decoded.userID;
        }
        next();
      } else {
        res.send({ err: "something wrong please login" });
      }
    });
  } catch (error) {
    res.send({ err: "something wrong please login" });
  }
};

module.exports = { auth };
