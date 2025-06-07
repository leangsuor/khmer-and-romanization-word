'use strict';

module.exports = (sequelize, DataTypes) => {
  const word_romanization = sequelize.define(
    'word_romanization',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      word: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      romanization: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },
    {
      tableName: 'word_romanization',
      timestamps: false
    }
  );
  return word_romanization;
};