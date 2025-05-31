// backend/routes/wordRoutes.js
'use strict';

const express = require('express');
const router = express.Router();

// Import the controller functions:
const {
  getRandomWord,
  getAllWords,
  createWord
} = require('../controllers/wordController');

// Route definitions:
// GET  /words/random    → getRandomWord
// GET  /words           → getAllWords
// POST /words           → createWord

router.get('/random', getRandomWord);
router.get('/', getAllWords);
router.post('/', createWord);

module.exports = router;
