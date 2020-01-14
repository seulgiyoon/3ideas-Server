const { users } = require('../../models');

module.exports = {
  signup: {
    post: (req, res) => {
      res.status(200).json('user signup post');
    },
  },
  login: {
    post: (req, res) => {
      res.status(201).json('user login post');
    },
  },
  logout: {
    post: (req, res) => {
      res.status(200).json('user logout post');
    },
  },
  get: (req, res) => {
    // GET: /user/userId
    const userId = req.params.userId;
    res.status(200).json(`user get. user id: ${userId}`);
  },
  delete: (req, res) => {
    res.status(200).json('user delete');
  },
};
