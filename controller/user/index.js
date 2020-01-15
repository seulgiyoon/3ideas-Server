const { users } = require('../../models');

module.exports = {
  signup: require('./signup'),
  login: require('./login'),
  logout: require('./logout'),
  get: (req, res) => {
    // GET: /user/userId
    const userId = req.params.userId;
    res.status(200).json(`user get. user id: ${userId}`);
  },
  delete: (req, res) => {
    res.status(200).json('user delete');
  },
  patch: (req, res) => {
    res.status(201).json('user fetch');
  },
};
