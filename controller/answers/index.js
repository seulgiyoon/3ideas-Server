const { answers } = require('../../models');

module.exports = {
  // ? 해당 질문의 답변글 id들 보내주기 ( /answers/질문글id )
  get: (req, res) => {
    // GET /:askId
    const target = req.params.askId;
    if (!Number(target)) {
      return res.status(400).json('bad request!');
    }

    answers
      .findAll({
        where: {question_id: target},
        attributes: ['id']
      })
      .then(result => {
        if(result.length === 0) {
          return res.status(404).json('no answers yet!')
        }
        res.status(200).json(result)
      })
      .catch(err => res.status(400).send(err))
  },
};