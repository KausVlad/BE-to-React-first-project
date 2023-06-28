const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const registration = async (email, password) => {
  const candidate = await userModel.findOne({ email });
  if (candidate) {
    throw new Error('User already exists');
  }
  const hashPass = await bcrypt.hash(password, 5);
  const user = await userModel.create({ email, password: hashPass });
};

module.exports = {
  registration,
};
