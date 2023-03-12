const { BadRequest } = require('../errors/');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (username == '' || password == '') {
    throw new BadRequest('did not provide a valid username or password');
  }

  //demo
  const id = new Date().getDate();

  // keep payload small
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `hello, ${req.user.username}`,
    secret: `here is your authorized data: ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
