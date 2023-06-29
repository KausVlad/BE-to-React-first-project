const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const {
  generateToken,
  saveToken,
  removeToken,
  validateRefreshToken,
  findToken,
} = require('../service/tokenService');
const ApiError = require('../exceptions/apiError');

const baseDto = (model) => {
  return {
    email: model.email,
    id: model._id,
  };
};

const registrationService = async (email, password) => {
  const candidate = await userModel.findOne({ email });
  if (candidate) {
    throw ApiError.BadRequestError(`User with this ${email} already exists`);
  }
  const hashPass = await bcrypt.hash(password, 5);
  const user = await userModel.create({ email, password: hashPass });

  const userDto = baseDto(user);
  const tokens = generateToken({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

const loginService = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw ApiError.BadRequestError('User not found');
  }
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequestError('Wrong password');
  }
  const userDto = baseDto(user);
  const tokens = generateToken({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

const logoutService = async (refreshToken) => {
  const token = removeToken(refreshToken);
  return token;
};

const refreshService = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  const userData = validateRefreshToken(refreshToken);
  const tokenFromDB = await findToken(refreshToken);
  if (!userData || !tokenFromDB) {
    throw ApiError.UnauthorizedError();
  }

  const user = await userModel.findById(userData.id);
  const userDto = baseDto(user);
  const tokens = generateToken({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

const testService = async () => {
  const users = await userModel.find();
  return users;
};

module.exports = {
  logoutService,
  loginService,
  registrationService,
  refreshService,
  testService,
};
