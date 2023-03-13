const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors/index');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = jwt.sign({ userId: user_id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.status(StatusCodes.CREATED).json({ token });
};
const login = async (req, res) => {
  res.send('login');
};

module.exports = {
  register,
  login,
};
