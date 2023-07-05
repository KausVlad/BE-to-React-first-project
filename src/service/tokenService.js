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

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    console.log(userData);
    return userData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    return userData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const removeToken = async (refreshToken) => {
  const tokenData = await tokenModel.deleteOne({ refreshToken });
  return tokenData;
};

const findToken = async (refreshToken) => {
  const tokenData = await tokenModel.findOne({ refreshToken });
  return tokenData;
};

module.exports = {
  generateToken,
  saveToken,
  validateAccessToken,
  validateRefreshToken,
  removeToken,
  findToken,
};
