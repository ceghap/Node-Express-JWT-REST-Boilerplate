const router = require('express').Router();
// import User model
const User = require('../models/User');
// import jwt
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

// import validation function
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  // incoming data validation from request body
  const { error } = registerValidation(req.body);
  // return 400 - bad request with error message
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if user already registered in DB
  const emailExist = await User.findOne({ email: req.body.email });
  // Throw error if email exist in DB
  if (emailExist) return res.status(400).send('Email already exist!');

  // hash password
  const salt = await bcrypt.genSalt(10); // create a salt
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user based on User model from mongoose.model(User)
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // save user in DB
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  // validate incoming data
  const { error } = loginValidation(req.body);
  // return 400 - bad request with error message
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if user already registered in DB
  const user = await User.findOne({ email: req.body.email });
  // if email not exist throw error
  if (!user) return res.status(400).send('Email or password is not valid!');

  // Check password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // If password is not valid
  if (!validPassword)
    return res.status(400).send('Email or password is not valid!');

  // create & assign a token jwt.sign( {payload}, secret );
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); // payload here is user id

  // return token to header
  res.header('auth-token', token).send(token);
});

module.exports = router;
