// backend/config/config.js

require('dotenv').config(); // ← so process.env.DB_* is loaded

module.exports = {
  development: {
    username: process.env.DB_USER,       // khmer_user
    password: process.env.DB_PASS,       // your_password
    database: process.env.DB_NAME,       // khmer_words_db
    host: process.env.DB_HOST,           // localhost
    port: process.env.DB_PORT,           // 3306
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true
    },
    define: {
      timestamps: false  // remove `createdAt`/`updatedAt` by default
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true
    },
    define: {
      timestamps: false
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true
    },
    define: {
      timestamps: false
    }
  }
};
