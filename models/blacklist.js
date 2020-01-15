'use strict';

module.exports = (sequelize, DataType) => {
  const blacklist = sequelize.define(
    'blacklist',
    {
      token: DataType.STRING,
    },
    {
      tableName: 'blacklist',
    },
  );

  return blacklist;
};
