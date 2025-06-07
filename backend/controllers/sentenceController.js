// backend/controllers/sentenceController.js
'use strict';

const { khmer_sentences, sequelize } = require('../models');

/**
 * GET /sentences/random
 * Returns a single random Khmer sentence (id + sentence).
 */
exports.getRandomSentence = async (req, res) => {
  try {
    const randomsentence = await khmer_sentences.findOne({
      order: sequelize.random(),
      attributes: ['id', 'sentence']
    });

    if (!randomsentence) {
      return res.status(404).json({ error: 'No sentences found in the database.' });
    }

    return res.json(randomsentence.get({ plain: true }));
  } catch (err) {
    console.error('Error fetching random sentence:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

/**
 * GET /sentences
 * Returns an array of all Khmer sentences (each: { id, sentence }).
 */
exports.getAllSentences = async (req, res) => {
  try {
    const allsentences = await khmer_sentences.findAll({
      order: [['id', 'ASC']],
      attributes: ['id', 'sentence']
    });

    const plain = allsentences.map(w => w.get({ plain: true }));
    return res.json(plain);
  } catch (err) {
    console.error('Error fetching all sentences:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

/**
 * POST /sentences
 * Body: { sentence: "<Khmer text>" }
 * Inserts a new sentence and returns the created record.
 */
exports.createSentence = async (req, res) => {
  const { sentence } = req.body;
  if (!sentence || !sentence.trim()) {
    return res.status(400).json({ error: 'Field "sentence" is required.' });
  }

  try {
    const newsentence = await khmer_sentences.create({ sentence: sentence.trim() });
    return res.status(201).json(newsentence.get({ plain: true }));
  } catch (err) {
    console.error('Error inserting new sentence:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};