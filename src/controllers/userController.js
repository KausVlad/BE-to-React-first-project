const reg = async (req, res) => {
  try {
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
