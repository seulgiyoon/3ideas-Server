const express = require('express');
const router = express.Router();

const { searchController } = require('../controller');

//? /search?q=키워드
router.get('/', searchController.get);

module.exports = router;
