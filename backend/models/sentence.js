'use strict';

module.exports = (sequelize, DataTypes) => {
  const khmer_sentences = sequelize.define(
    'khmer_sentences',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sentence: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'khmer_sentences',
      timestamps: false
    }
  );
  return khmer_sentences;
};