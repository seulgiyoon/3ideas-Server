const express = require('express');
const router = express.Router();

const { likeController } = require('../controller');

router.post('/:answerId', likeController.post);
router.delete('/:answerId', likeController.delete);

module.exports = router;
