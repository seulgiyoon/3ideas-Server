module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: '3ideas',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  },
};
