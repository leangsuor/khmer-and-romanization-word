'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('khmer_words', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      word: {
        type: Sequelize.TEXT,
        allowNull: false
      }
      // Note: We do NOT add createdAt / updatedAt because we explicitly disabled timestamps
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('khmer_words');
  }
};
