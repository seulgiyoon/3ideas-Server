const { questions, answers } = require('../../models');

module.exports = {
  get: (req, res) => {
    // GET /asks?s=target
    const target = req.query.s;
    res.status(200).json(`asks get. query: ${target}`);
  },
};
