const { user_like, users, answers } = require('../../models');

module.exports = {
  //? 좋아요 요청( /like/답변글id )
  post: (req, res) => {
    const { answerId } = req.params;
    const { username } = req.body;

    users.findOne({ where: { userName: username } }).then(user => {
      if (!user) {
        return res.status(400).json('invalid userId');
      }

      user_like.findOrCreate({ where: { user_id: user.id, answer_id: answerId } }).then(([, created]) => {
        if (!created) {
          return res.status(422).json('already liked');
        }

        res.status(200).json(`answerId: ${answerId}, username: ${username} add like complete`);
      });
    });
  },

  //? 좋아요 취소( /like/답변글id )
  delete: (req, res) => {
    const { answerId } = req.params;
    const { username } = req.body;

    users.findOne({ where: { userName: username } }).then(user => {
      if (!user) {
        return res.status(400).json('invalid userId');
      }

      user_like.destroy({ where: { user_id: user.id, answer_id: answerId } }).then(destroyedRows => {
        if (!destroyedRows) {
          return res.status(422).json('invalid username or answerId');
        }

        res.status(200).json(`answerId: ${answerId}, username: ${username} delete like complete`);
      });
    });
  },
};
