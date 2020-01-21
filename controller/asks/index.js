const { questions, users, answers } = require('../../models');

module.exports = {
  //? 질문글 목록 요청( /asks )
  get: (req, res) => {
    questions
      .findAll({
        attributes: ['id', 'title', 'questionFlag', 'createdAt', 'contents'],
        include: [
          {
            model: users,
            attributes: ['userName'],
          },
          {
            model: answers,
            attributes: ['id'],
          },
        ],
      })
      .then(asks => {
        asks = asks.map(value => {
          const ask = {};
          Object.assign(ask, value.dataValues);

          ask.username = ask.user.userName;
          delete ask.user;

          ask.commentsCount = ask.answers.length;
          delete ask.answers;

          return ask;
        });

        res.status(200).json(asks);
      })
      .catch(err => res.status(400).send(err));
  },
};
