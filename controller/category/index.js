const { questions } = require('../../models');

module.exports = {
  get: (req, res) => {
    // GET /category/categoryName?s=target
    const category = req.params.category;
    const target = req.query.s;
    res.status(200).json(`category get. category: ${category}, query: ${target}`);
  },
};
