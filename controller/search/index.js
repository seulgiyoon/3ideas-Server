const { questions, answers, users } = require('../../models');
const { Sequelize } = require('sequelize');
const { and, or, like, not } = Sequelize.Op;

module.exports = {
  //? 검색 기능 ( /search?q=키워드 )
  get: async (req, res) => {
    let keyword = req.query.q;
    keyword = keyword.trim(); //trim으로 앞뒤 공백 제거
    if (!keyword.length) {
      //! 키워드에 공백만 존재
      return res.status(400).json('invalid target');
    }

    keyword = keyword.replace(/\s\s+/gi, ' '); //target 사이에 공백이 2개 이상 존재 > 하나의 공백으로 변환

    //* 1. questions에서 찾기 => question id 저장
    const searchIdResult = [];
    await questions
      .findAll({
        where: {
          [or]: [{ contents: { [like]: `%${keyword}%` } }, { title: { [like]: `%${keyword}%` } }],
        },
      })
      .then(asks => {
        // console.log(asks);
        asks = asks.forEach(value => {
          const { id } = value;
          searchIdResult.push({ id });
        });
        return asks;
      });
    // console.log(searchIdResult);

    //* 2. answers에서 찾기 => answer.user_id가 위에서 찾은 결과와 겹치지 않는다면 searchResult에 저장!
    const answersNotCondition = searchIdResult.map(value => {
      const question_id = value.id;
      return { question_id };
    });
    // console.log(answersNotCondition);

    await answers
      .findAll({
        attributes: ['question_id'],
        where: {
          [and]: [{ [not]: { [or]: answersNotCondition } }, { contents: { [like]: `%${keyword}%` } }],
        },
      })
      .then(result => {
        // console.log(result);
        result = result.forEach(value => {
          const id = value.question_id;
          searchIdResult.push({ id });
        });
        return result;
      });
    // console.log(searchIdResult);

    //? 찾은 questions id를 토대로 res로 보내줄 내용을 찾음
    const searchResult = await questions
      .findAll({
        attributes: ['id', 'title', 'questionFlag', 'createdAt'],
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
        where: {
          [or]: searchIdResult,
        },
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
        return asks;
      });

    res.status(200).json(searchResult);
  },
};
