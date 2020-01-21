const express = require('express');
const router = express.Router();

const { categoryController } = require('../controller');

//GET: /
router.get('/', categoryController.get);
//GET: /카테고리명?s=키워드
router.get('/:category', categoryController.list.get);

module.exports = router;
