// backend/routes/wordRoutes.js
'use strict';

const express = require('express');
const router = express.Router();

// Import the controller functions:
const {
  getRandomWord,
  getAllWords,
  createWord,
  createWordRomanization
} = require('../controllers/wordController');

router.get('/words/random', getRandomWord);
router.get('/words', getAllWords);
router.post('/words', createWord);
router.post('/word-romanization', createWordRomanization);

module.exports = router;
