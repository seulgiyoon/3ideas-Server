const { categories } = require('../../models');

module.exports = {
  //? 해당 카테고리에 속해있는 게시글을 받아옴
  list: require('./list'),

  //? 카테고리들의 목록을 받아옴 ( /category )
  get: (req, res) => {
    categories.findAll({ attributes: ['categoryName'] }).then(result => {
      if (!result.length) {
        return res.status(404).json('categories are empty');
      }
      return res.status(200).json(result);
    });
  },
};
