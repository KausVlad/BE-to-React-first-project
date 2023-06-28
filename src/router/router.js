const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  reg,
  refresh,
} = require('../controllers/userController');

router.post('/reg', reg);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);

module.exports = router;
