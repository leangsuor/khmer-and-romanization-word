// backend/server.js
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./models');          // Used only if you want to sync
const wordRoutes = require('./routes/wordRoutes');  // Import our new router

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4000' // adjust if your React client runs somewhere else
  })
);

// (Optional) Sync DB schema on startup. If you run migrations instead, you can comment this out:
/*
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized (Sequelize).');
  } catch (err) {
    console.error('❌ DB sync error:', err);
  }
})();
*/

// Mount the wordRoutes under "/words"
app.use('/words', wordRoutes);

// A simple healthcheck endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
