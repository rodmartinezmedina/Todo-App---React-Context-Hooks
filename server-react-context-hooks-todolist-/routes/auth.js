const express = require('express');
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");
const saltRounds = 10;

// get User
router.get('/', function (req, res, next) {
  const id = = req.session.currentUser._id
  User.findById(id)
    .populate('tasks')
    .then((currentUser) => {
      currentUser.password = "";
      res
        .status(200)
        .json(currentUser);
    })
});


// create User
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userNameExists = await User.findOne({ username }, 'username');

    if (userNameExists) return next(createError(400));
    else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = await User.create({ username, password, hashPass });
      newUser.password = "";
      req.session.currentUser = newUser;
      res
        .status(201)
        .json(newUser);
    }
  }
  catch (error) {
    next(createError(error));
  }
});


// login User
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!email) {
      next(createError(404));
    }
    else if (bcrypt.compareSync(password, user.password)) {
      user.password = "";
      req.session.currentUser = user;
      res
        .status(200)
        .json(user)
    }
    else {
      next(createError(401));
    }
  }
  catch (error) {
    next(createError(error));
  }
})


// logout User
router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res
    .status(204)
    .send();
});

module.exports = router;