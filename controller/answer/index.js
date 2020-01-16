const { answers } = require('../../models');

module.exports = {
  post: (req, res) => {
    res.status(201).json('answer post');
  },
  get: (req, res) => {
    res.status(200).json('answer get');
  },
  patch: (req, res) => {
    res.status(200).json('answer patch');
  },
  delete: (req, res) => {
    res.status(200).json('answer delete');
  },
};
