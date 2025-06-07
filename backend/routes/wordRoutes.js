// backend/routes/wordRoutes.js
'use strict';

const express = require('express');
const router = express.Router();

// Import the controller functions:
const {
  getRandomWord,
  getAllWords,
  createWord,
  createRomanization
} = require('../controllers/wordController');

router.get('/words/random', getRandomWord);
router.get('/words', getAllWords);
router.post('/words', createWord);
router.post('/word-romanization', createRomanization);

module.exports = router;
