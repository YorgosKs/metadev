const router = require('express').Router();
const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { emailExists, jwtAuth } = require('../middleware/auth');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Check if email and password are provided
    if (!req.body.email || !req.body.password) {
      return res.status(400).json('Missing email or password!');
    }

    // Check if email is valid
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json('Invalid email!');
    }

    // Check if password is valid
    if (!passwordRegex.test(req.body.password)) {
      return res
        .status(400)
        .json(
          'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!'
        );
    }

    // Check if email already exists
    const emailExist = await emailExists(req.body.email);

    if (emailExist) {
      return res.status(400).json('Email already exists!');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      password: hashedPassword,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    // save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Check if email and password are provided
    if (!req.body.email || !req.body.password) {
      return res.status(400).json('Missing email or password!');
    }

    // Check if email is valid
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json('Invalid email!');
    }

    // Check if email exists
    const emailExist = await emailExists(req.body.email);

    if (!emailExist) {
      return res.status(400).json('Email does not exist!');
    }

    // Check if password is valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      emailExist.password
    );

    if (!validPassword) {
      return res.status(400).json('Invalid password!');
    }

    // Create and assign token
    const token = jwt.sign({ _id: emailExist._id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });

    // Respond with token and user
    res
      .header('auth-token', token)
      .status(200)
      .json({ token: token, user: emailExist });
  } catch (err) {
    res.status(500).json(err);
  }
});

// confirm token
router.get('/check', async (req, res) => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      console.log('no token');
      return res.status(401).json(false);
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY);

    if (!verified) {
      return res.status(401).json(false);
    }

    const user = await User.findById(verified._id);

    if (!user) {
      return res.status(401).json(false);
    }

    return res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err);
  }
});

// reset password
router.post('/reset', async (req, res) => {
  try {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is provided
    if (!req.body.email) {
      return res.status(400).json('Missing email!');
    }

    // Check if email is valid
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json('Invalid email');
    }

    // Check if email exists
    const emailExist = await User.findOne({ email: req.body.email });

    if (!emailExist) {
      return res.status(400).json('Email does not exist!');
    } else {
      return res.status(200).json('Email exists!');
    }
  } catch (err) {
    res.status(500).json("Couldn't reset password");
    console.log(err);
  }
});

// reset password after checking email
router.post('/reset-password', async (req, res) => {
  try {
    // Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Check if password is provided
    if (!req.body.password) {
      return res.status(400).json('Missing password!');
    }

    // Check if password is valid
    if (!passwordRegex.test(req.body.password)) {
      return res
        .status(400)
        .json(
          'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!'
        );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // update password
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { password: hashedPassword }
    );

    // save user and respond
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
