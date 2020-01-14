const { questions } = require('../../models');

module.exports = {
  post: (req, res) => {
    res.status(201).json('ask post');
  },
  get: (req, res) => {
    res.status(200).json('ask get');
  },
  patch: (req, res) => {
    res.status(200).json('ask patch');
  },
  delete: (req, res) => {
    res.status(200).json('ask delete');
  },
};
