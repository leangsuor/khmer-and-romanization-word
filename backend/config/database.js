// backend/config/database.js
'use strict';

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,   // "khmer_words_db"
  process.env.DB_USER,   // "khmer_user"
  process.env.DB_PASS,   // "your_password"
  {
    host: process.env.DB_HOST,   // "localhost"
    port: process.env.DB_PORT,   // "3306"
    dialect: 'mysql',            // ← was 'postgres', now 'mysql'
    logging: false,              // or console.log if you want SQL logs
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established.');
  } catch (err) {
    console.error('❌ Unable to connect to MySQL:', err);
  }
})();

module.exports = sequelize;
