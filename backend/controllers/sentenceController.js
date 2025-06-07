// backend/controllers/sentenceController.js
'use strict';

const { khmer_sentences, sentence_romanization, sequelize } = require('../models');

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
    // 1) parse & sanitize query params
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const perPage = Math.max(parseInt(req.query.perPage, 10) || 10, 1);
    const sortField = ['id', 'sentence', 'romanization'].includes(req.query.sortField)
      ? req.query.sortField
      : 'id';
    const sortOrder = (req.query.sortOrder || 'asc').toLowerCase() === 'desc'
      ? 'DESC'
      : 'ASC';
    const search = (req.query.search || '').trim();

    // 2) build WHERE for search, if provided
    const where = search
      ? {
        [Op.or]: [
          { sentence: { [Op.like]: `%${search}%` } },
          { romanization: { [Op.like]: `%${search}%` } },
          { id: { [Op.eq]: Number(search) || 0 } }
        ]
      }
      : {};

    // 3) fetch page + count
    const { count: total, rows: data } = await sentence_romanization.findAndCountAll({
      where,
      order: [[sortField, sortOrder]],
      limit: perPage,
      offset: (page - 1) * perPage,
      attributes: ['id', 'sentence', 'romanization']
    });

    // 4) respond with { total, data }
    return res.json({ total, data });
  } catch (err) {
    console.error('Error fetching paginated sentences:', err);
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

/**
 * POST /sentence-romanization
 * Body: { sentence: "<Khmer text>", romanization: "<Romanized text>" }
 * Inserts a new sentence and returns the created record.
 */
exports.createSentenceRomanization = async (req, res) => {
  const { sentence, romanization } = req.body;
  if (!sentence || !sentence.trim()) {
    return res.status(400).json({ error: 'Field "sentence" is required.' });
  }
  if (!romanization || !romanization.trim()) {
    return res.status(400).json({ error: 'Field "romanization" is required.' });
  }

  try {
    const sentence_rec = await khmer_sentences.findOne({
      where: { sentence: sentence.trim() }
    });
    if (!sentence_rec) {
      await khmer_sentences.create({ sentence: sentence.trim() });
    }
    const sentence_romanization_rec = await sentence_romanization.findOne({
      where: { sentence: sentence.trim(), romanization: romanization.trim() }
    });
    if (sentence_romanization_rec) {
      return res.status(409).json({ error: 'This sentence-romanization pair already exists.' });
    }
    const newWord = await sentence_romanization.create({ sentence: sentence.trim(), romanization: romanization.trim() });
    return res.status(201).json(newWord.get({ plain: true }));
  } catch (err) {
    console.error('Error inserting new sentence romanization:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};