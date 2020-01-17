'use strict';

module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define(
    'questions',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      questionFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );

  questions.associate = function(models) {
    models.questions.belongsTo(models.users, {
      foreignKey: 'user_id',
    });
    models.questions.hasMany(models.answers, {
      foreignKey: 'question_id',
    });
    models.questions.hasMany(models.category_question, {
      foreignKey: 'question_id',
    });
  };
  return questions;
};
