const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/google', AuthController.googleAuth);
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), AuthController.googleAuthCallback);


module.exports = router;
