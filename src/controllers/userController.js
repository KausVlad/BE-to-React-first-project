const { registration } = require('../service/userService');

const reg = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await registration(email, password);
    res.cookie('refreshToken', userData.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.json(userData);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    res.json(['Hello', 'world']);
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const refresh = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  logout,
  reg,
  refresh,
};
