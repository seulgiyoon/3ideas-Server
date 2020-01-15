const { blacklist } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  post: (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      //? token이 존재하지 않음
      return res.status(400).json(`token isn't exist`);
    }

    let tokenErr = false;
    const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        // console.log(err.name);
        tokenErr = true;

        switch (err.name) {
          case 'TokenExpiredError':
            //? token이 만료됨.
            return res.status(401).json('token is already expired');
          default:
            //? token decoded 에러
            return res.status(400).json(`invalid token. error name: ${err.name}`);
        }
      }
      return decoded;
    });

    // console.log({ decoded });
    if (tokenErr) {
      //! token decoded error
      return;
    }

    if (!decoded) {
      //! token decoded value is null
      return res.status(401).json(`can't decode the token`);
    }

    //? blacklist에서 token 찾기
    //* blacklist에 해당 토큰이 존재하지 않음
    //* => blacklist에 토큰 추가 : findOrCreate
    blacklist
      .findOrCreate({ where: { token } })
      .then(([result, created]) => {
        if (!created) {
          //? blacklist에 토큰이 이미 존재함
          return res.status(200).json('logout complete');
        }

        res.status(200).json('logout complete, add blacklist complete');
      })
      .catch(err => res.status(400).send(err));
  },
};
