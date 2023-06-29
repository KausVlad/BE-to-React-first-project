const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  reg,
  refresh,
} = require('../controllers/userController');
const { body } = require('express-validator');

router.post(
  '/reg',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 30 }),
  reg
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);

module.exports = router;
