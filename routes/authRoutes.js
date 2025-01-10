const express = require('express');
const { register, login, socialLogin, updatePassword } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/social', socialLogin);
router.put('/update-password', updatePassword); 
module.exports = router;

