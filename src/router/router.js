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
const {
  addApiKey,
  deleteApiKey,
  getAllApiKeys,
} = require('../controllers/keysController');

router.post(
  '/reg',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 30 }),
  reg
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.post('/apiKeys', authMiddleware, addApiKey);
router.patch('/apiKeys', authMiddleware, deleteApiKey);
router.get('/apiKeys/:emailName', authMiddleware, getAllApiKeys);

module.exports = router;
