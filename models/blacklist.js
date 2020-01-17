'use strict';

module.exports = (sequelize, DataType) => {
  const blacklist = sequelize.define(
    'blacklist',
    {
      token: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'blacklist',
    },
  );

  return blacklist;
};
