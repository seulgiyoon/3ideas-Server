const { questions } = require('../../models');

module.exports = {
  get: (req, res) => {
    // GET /category/categoryName
    const category = req.params.category;
    res.status(200).json(`category get. category: ${category}`);
  },
};
