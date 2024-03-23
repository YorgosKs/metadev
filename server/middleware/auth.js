const User = require('../models/user.models');
const jwt = require('jsonwebtoken');

const emailExists = async (email, next, res) => {
  try {
    const checkEmail = await User.findOne({ email: email });

    if (checkEmail) {
      return checkEmail;
    }

    return false;
  } catch (err) {
    next(err);
  }
};

const jwtAuth = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json('No token!');
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    console.log('verified', verified);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json('Invalid Token!');
  }
};

module.exports = { emailExists, jwtAuth };
