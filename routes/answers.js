const express = require('express');
const router = express.Router();

const { answersController } = require('../controller');

router.get('/:askId', answersController.get);

module.exports = router;
