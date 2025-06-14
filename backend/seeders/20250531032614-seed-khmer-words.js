'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert a few sample Khmer words
    // return queryInterface.bulkInsert('khmer_words', [
    //   { word: 'សួស្តី' },       // “Hello”
    //   { word: 'អរុណសួស្តី' },  // “Good morning”
    //   { word: 'សូមអរគុណ' },   // “Thank you”
    //   { word: 'អស់រង់ចាំ' },    // “Please wait”
    //   { word: 'ជម្រាបសួរ' }    // “Goodbye”
    // ], {});
  },

  async down(queryInterface, Sequelize) {
    // Delete all rows from khmer_words
    return queryInterface.bulkDelete('khmer_words', null, {});
  }
};
