const { answers } = require('../../models');

module.exports = {
  post: (req, res) => {
    res.status(201).json('answer post');
  },
  patch: (req, res) => {
    res.status(200).json('answer patch');
  },
  delete: (req, res) => {
    res.status(200).json('answer delete');
  },
};
