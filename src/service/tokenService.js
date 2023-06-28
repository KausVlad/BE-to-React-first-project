const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: '30d',
  });
  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userID, refreshToken) => {
  const tokenData = await tokenModel.findOne({
    user: userID,
  });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = await tokenModel.create({
    user: userID,
    refreshToken,
  });
  return token;
};

module.exports = {
  generateToken,
  saveToken,
};
