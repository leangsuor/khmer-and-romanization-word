// backend/controllers/wordController.js
'use strict';

const { Op } = require('sequelize');
const { khmer_word, word_romanization, sequelize } = require('../models');

/**
 * GET /words/random
 * Returns a single random Khmer word (id + word).
 */
exports.getRandomWord = async (req, res) => {
  try {
    const randomWord = await khmer_word.findOne({
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
 * Query params:
 *   - page      (default 1)
 *   - perPage   (default 10)
 *   - sortField (one of 'id', 'word', 'romanization'; default 'id')
 *   - sortOrder ('asc' or 'desc'; default 'asc')
 *   - search    (optional substring match on id, word, or romanization)
 */
exports.getAllWords = async (req, res) => {
  try {
    // 1) parse & sanitize query params
    const page      = Math.max(parseInt(req.query.page, 10)    || 1, 1);
    const perPage   = Math.max(parseInt(req.query.perPage, 10) || 10, 1);
    const sortField = ['id','word','romanization'].includes(req.query.sortField)
                      ? req.query.sortField
                      : 'id';
    const sortOrder = (req.query.sortOrder || 'asc').toLowerCase() === 'desc'
                      ? 'DESC'
                      : 'ASC';
    const search    = (req.query.search || '').trim();

    // 2) build WHERE for search, if provided
    const where = search
      ? {
          [Op.or]: [
            { word:         { [Op.like]: `%${search}%` } },
            { romanization: { [Op.like]: `%${search}%` } },
            { id:           { [Op.eq]: Number(search) || 0 } }
          ]
        }
      : {};

    // 3) fetch page + count
    const { count: total, rows: data } = await word_romanization.findAndCountAll({
      where,
      order: [[ sortField, sortOrder ]],
      limit:  perPage,
      offset: (page - 1) * perPage,
      attributes: ['id', 'word', 'romanization']
    });

    // 4) respond with { total, data }
    return res.json({ total, data });
  } catch (err) {
    console.error('Error fetching paginated words:', err);
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
    const newWord = await khmer_word.create({ word: word.trim() });
    return res.status(201).json(newWord.get({ plain: true }));
  } catch (err) {
    console.error('Error inserting new word:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

/**
 * POST /word-romanization
 * Body: { word: "<Khmer text>", romanization: "<Romanized text>" }
 * Inserts a new word and returns the created record.
 */
exports.createWordRomanization = async (req, res) => {
  const { word, romanization } = req.body;
  if (!word || !word.trim()) {
    return res.status(400).json({ error: 'Field "word" is required.' });
  }
  if (!romanization || !romanization.trim()) {
    return res.status(400).json({ error: 'Field "romanization" is required.' });
  }

  try {
    const word_rec = await khmer_word.findOne({
      where: { word: word.trim() }
    });
    if (!word_rec) {
      await khmer_word.create({ word: word.trim() });
    }
    const word_romanization_rec = await word_romanization.findOne({
      where: { word: word.trim(), romanization: romanization.trim() }
    });
    if (word_romanization_rec) {
      return res.status(409).json({ error: 'This word-romanization pair already exists.' });
    }
    const newWord = await word_romanization.create({ word: word.trim(), romanization: romanization.trim() });
    return res.status(201).json(newWord.get({ plain: true }));
  } catch (err) {
    console.error('Error inserting new word romanization:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
