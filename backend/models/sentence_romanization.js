'use strict';

module.exports = (sequelize, DataTypes) => {
  const sentence_romanization = sequelize.define(
    'sentence_romanization',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sentence: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      romanization: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },
    {
      tableName: 'sentence_romanization',
      timestamps: false
    }
  );
  return sentence_romanization;
};