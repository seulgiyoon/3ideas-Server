'use strict';

module.exports = (sequelize, DataTypes) => {
  const answers = sequelize.define(
    'answers',
    {
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answerFlag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );

  answers.associate = function(models) {
    models.answers.belongsTo(models.users, {
      foreignKey: 'user_id',
    });
    models.answers.belongsTo(models.questions, {
      foreignKey: 'question_id',
    });
  };
  return answers;
};
