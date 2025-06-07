// backend/routes/sentenceRoutes.js
'use strict';

const express = require('express');
const router = express.Router();

// Import the controller functions:
const {
  getRandomSentence,
  getAllSentences,
  createSentence,
  // createRomanization
} = require('../controllers/sentenceController');

router.get('/sentences/random', getRandomSentence);
router.get('/sentences', getAllSentences);
router.post('/sentences', createSentence);
// router.post('/sentence-romanization', createRomanization);

module.exports = router;
