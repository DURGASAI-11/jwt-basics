// check username ,password in post (login) request (req.body)
// if exist create new JWT
// send back to front-end
//setup authentication so only the request with JWT can access the dashboard
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { BadRequestError } = require("../errors");
module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  //   require("dotenv").config();

  // mongo
  // Joi
  //check in the controller

  if (!username || !password) {
    throw new BadRequestError("please provide email and password");
  }
  // just for demo ,normally provide by DB!!!
  const id = new Date().getDate();

  //try to keep payload small,better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwttoken", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({ status: "success", msg: "user created ", token });
};

module.exports.dashbord = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `I Am ${req.user.username}`,
    secret: `My lucky number is ${luckyNumber}`,
  });
};
