const { user_like, users, answers } = require('../../models');

module.exports = {
  //? 좋아요 요청( /like/답변글id )
  post: async (req, res) => {
    const { answerId } = req.params;
    const { username } = req.body;

    if (!Number(answerId)) {
      return res.status(400).json('invalid API');
    }
    const answer = await answers.findOne({ where: { id: answerId } });
    if (!answer) {
      return res.status(400).json('invalid answer id');
    }

    const user = await users.findOne({ where: { userName: username } });
    if (!user) {
      return res.status(400).json('invalid username');
    }

    user_like.findOrCreate({ where: { user_id: user.id, answer_id: answerId } }).then(([, created]) => {
      if (!created) {
        return res.status(422).json('already liked');
      }

      res.status(200).json(`answerId: ${answerId}, username: ${username} add like complete`);
    });
  },

  //? 좋아요 취소( /like/답변글id )
  delete: async (req, res) => {
    const { answerId } = req.params;
    const { username } = req.body;

    if (!Number(answerId)) {
      return res.status(400).json('invalid API');
    }
    const answer = await answers.findOne({ where: { id: answerId } });
    if (!answer) {
      return res.status(400).json('invalid answer id');
    }

    const user = await users.findOne({ where: { userName: username } });
    if (!user) {
      return res.status(400).json('invalid username');
    }

    user_like.destroy({ where: { user_id: user.id, answer_id: answerId } }).then(destroyedRows => {
      if (!destroyedRows) {
        return res.status(422).json('invalid username or answerId');
      }

      res.status(200).json(`answerId: ${answerId}, username: ${username} delete like complete`);
    });
  },
};
