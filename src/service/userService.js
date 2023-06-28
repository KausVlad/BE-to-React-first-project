const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken, saveToken } = require('../service/tokenService');
const ApiError = require('../exceptions/apiError');

const baseDto = (model) => {
  return {
    email: model.email,
    id: model._id,
  };
};

const registration = async (email, password) => {
  const candidate = await userModel.findOne({ email });
  if (candidate) {
    throw ApiError.BadRequestError(`User with this ${email} already exists`);
  }
  const hashPass = await bcrypt.hash(password, 5);
  const user = await userModel.create({ email, password: hashPass });

  const userDto = baseDto(user);
  const tokens = generateToken({ ...userDto });
  await saveToken(user._id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

module.exports = {
  registration,
};
