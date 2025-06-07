'use strict';

module.exports = (sequelize, DataTypes) => {
  const khmer_word = sequelize.define(
    'khmer_word',
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
  return khmer_word;
};