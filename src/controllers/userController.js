const {
  registrationService,
  loginService,
  logoutService,
  refreshService,
  testService,
} = require('../service/userService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');

const reg = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequestError(
          'Invalid email or password. Password must be 3-30 characters.',
          errors.array()
        )
      );
    }
    const { email, password } = req.body;
    const userData = await registrationService(email, password);

    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await loginService(email, password);

    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await logoutService(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await refreshService(refreshToken);

    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

const test = async (req, res, next) => {
  try {
    const users = await testService();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  reg,
  refresh,
  test,
};
