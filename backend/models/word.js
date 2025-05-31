'use strict';

module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define(
    'Word',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      word: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'khmer_words',
      timestamps: false
    }
  );
  return Word;
};