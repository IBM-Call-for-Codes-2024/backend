const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController'); // Import the entire AuthController module

// Destructure the functions used in routes
const { signup, login, googleAuth, googleAuthCallback } = AuthController;

router.post('/signup', signup);
router.post('/login', login);
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

module.exports = router;
