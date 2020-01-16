const { users, blacklist } = require('../../models');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
  post: (req, res) => {
    const { username } = req.body;

    if (req.cookies.token) {
      //? 이미 발급받은 토큰이 존재함
      let loginErr = false;
      const token = req.cookies.token;
      blacklist
        .findOne({ where: { token } })
        .then(result => {
          if (result) {
            //! 이미 blacklist에 올라가 있는 token
            loginErr = true;
            return res.status(401).json('invalid token');
          }
        })
        .catch(err => {
          loginErr = true;
          return res.status(400).send(err);
        });

      if (loginErr) {
        return;
      }

      //? 유효한 토큰인지 확인
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (decoded) {
          //! 유효한 토큰
          loginErr = true;
          return res.status(401).json('you have token');
        }
      });

      if (loginErr) {
        return;
      }
    }

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
      .findOne({ where: { userName: username } })
      .then(result => {
        //? username 존재여부 확인
        if (!result) {
          //! username 존재하지 않음
          return res.status(404).json('invalid username!');
        }

        const user = result.dataValues;
        //? password 일치 확인
        if (user.password !== password) {
          //! password 불일치
          return res.status(404).json('invalid password!');
        }

        //? login
        const token = jwt.sign(
          {
            userid: user.id,
            username: user.userName,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '1h',
          },
        );

        res.cookie('token', token);
        res.status(200).json({ username: user.userName });
      })
      .catch(err => res.status(400).send(err));
  },
};
