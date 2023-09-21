const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
require('dotenv').config();

const generateResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateResetToken;
