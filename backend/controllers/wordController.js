// backend/controllers/wordController.js
'use strict';

const { Word, sequelize } = require('../models');

/**
 * GET /words/random
 * Returns a single random Khmer word (id + word).
 */
exports.getRandomWord = async (req, res) => {
  try {
    const randomWord = await Word.findOne({
      order: sequelize.random(),
      attributes: ['id', 'word']
    });

    if (!randomWord) {
      return res.status(404).json({ error: 'No words found in the database.' });
    }

    return res.json(randomWord.get({ plain: true }));
  } catch (err) {
    console.error('Error fetching random word:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

/**
 * GET /words
 * Returns an array of all Khmer words (each: { id, word }).
 */
exports.getAllWords = async (req, res) => {
  try {
    const allWords = await Word.findAll({
      order: [['id', 'ASC']],
      attributes: ['id', 'word']
    });

    const plain = allWords.map(w => w.get({ plain: true }));
    return res.json(plain);
  } catch (err) {
    console.error('Error fetching all words:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

/**
 * POST /words
 * Body: { word: "<Khmer text>" }
 * Inserts a new word and returns the created record.
 */
exports.createWord = async (req, res) => {
  const { word } = req.body;
  if (!word || !word.trim()) {
    return res.status(400).json({ error: 'Field "word" is required.' });
  }

  try {
    const newWord = await Word.create({ word: word.trim() });
    return res.status(201).json(newWord.get({ plain: true }));
  } catch (err) {
    console.error('Error inserting new word:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
