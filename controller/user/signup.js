const { users } = require('../../models');
const crypto = require('crypto');

module.exports = {
  post: (req, res) => {
    const { username } = req.body;

    if (!username) {
      //! username이 비어있음
      return res.status(400).json('please insert username');
    } else if (!req.body.password) {
      //! password가 비어있음
      return res.status(400).json('please insert password');
    }

    const password = crypto
      .pbkdf2Sync(req.body.password, username + process.env.PASS_SALT, 100000, 64, 'sha512')
      .toString('hex');

    users
      .findOrCreate({ where: { userName: username }, defaults: { password } })
      .then(([result, created]) => {
        if (!created) {
          //? 유저이름 이미 존재함
          return res.status(409).json('username is already exists!!!');
        }

        //유저생성 시 응답
        const { point, report, id, userName, createdAt } = result;
        res.status(200).json({ id, userName, point, report, createdAt });
      })
      .catch(err => res.status(400).send(err));
  },
};
