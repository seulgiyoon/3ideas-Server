const express = require('express');
const router = express.Router();

const { asksController } = require('../controller');

router.get('/', asksController.get);

module.exports = router;
