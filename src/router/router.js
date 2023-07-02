const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  reg,
  refresh,
  test,
} = require('../controllers/userController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/reg',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 30 }),
  reg
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.get('/t', authMiddleware, test);
router.get('/check', authMiddleware, refresh);

module.exports = router;
