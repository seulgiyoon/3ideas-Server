const express = require('express');
const router = express.Router();

const { answerController } = require('../controller');

router.post('/:askId', answerController.post);
router.patch('/:askId/:answerId', answerController.patch);
router.delete('/:askId/:answerId', answerController.delete);

module.exports = router;
