const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Public routes
router.post('/login', userController.login);
router.post('/register', userController.createUser);

// Protected routes (would need middleware)
// router.get('/profile', userController.getProfile);
// router.put('/profile', userController.updateProfile);

module.exports = router; 