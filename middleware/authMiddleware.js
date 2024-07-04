const { model } = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      //toFind user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({
        error: "You are not logged in! Please log in to get access",
      });
    }
  if (!token) {
    return res.status(401).json({
      msg: "Not Authorized, No tokens",
    });
  }
};

module.exports = { auth };
