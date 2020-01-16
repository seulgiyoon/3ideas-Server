const { answers } = require('../../models');

module.exports = {
  get: (req, res) => {
    // GET /:askId
    const target = req.params.askId;
    res.status(200).json(`asks get. params: ${target}`);
  },
};
