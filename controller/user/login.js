const { users } = require('../../models');
const crypto = require('crypto');

module.exports = {
  post: (req, res) => {
    res.status(201).json('user login post');
  },
};
