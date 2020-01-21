const { questions, categories, category_question } = require('../../models');

module.exports = {
  //? 해당 카테고리에 속해있는 게시글을 받아옴 ( /category/카테고리명 )
  get: (req, res) => {
    const { category } = req.params;
    res.status(200).json(`category get. category: ${category}`);
  },
};
