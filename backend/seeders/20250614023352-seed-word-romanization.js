'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const filePath = path.join(__dirname, './assets/gram1_lang0.json');
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);

    // If your JSON contains an array of objects, modify as needed
    const rows = [];
    data.forEach(entry => {
      if (Array.isArray(entry.oth)) {
        entry.oth.forEach(romanization => {
          rows.push({
            word: entry.word,
            romanization: romanization,
          });
        });
      }
    });

    await queryInterface.bulkInsert('word_romanization', rows, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('word_romanization', null, {});
  }
};
