const express = require('express');
const router = express.Router();

const { asksController } = require('../controller');

router.get(':target', asksController.get);

module.exports = router;
