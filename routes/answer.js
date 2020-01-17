const express = require('express');
const router = express.Router();

const { answerController } = require('../controller');

router.post('/:askId', answerController.post);
router.get('/:answerId', answerController.get);
router.patch('/:answerId', answerController.patch);
router.delete('/:answerId', answerController.delete);

module.exports = router;
