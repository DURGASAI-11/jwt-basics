const jwt = require("jsonwebtoken");
const {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors/index");

module.exports.authenticationMiddleware = async (req, res, next) => {
  let token = "";
  if (req.cookies.jwttoken) {
    token = req.cookies.jwttoken;
  } else if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
  } else {
    throw new UnauthenticatedError("Not token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, username } = decoded;
    req.user = { id, username };
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
  next();
};
