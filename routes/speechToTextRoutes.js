const express = require('express');
const multer = require('multer');
const { speechToText } = require('../controllers/speechToTextController');

// Multer setup to handle file uploads
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// POST route for speech-to-text
router.post('/speech-to-text', upload.single('audio'), speechToText);

module.exports = router;
