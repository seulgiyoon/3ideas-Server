const express = require('express');
const router = express.Router();

const { askController } = require('../controller');

router.post('/', askController.post);
router.get('/:askId', askController.get);
router.patch('/:askId', askController.patch);
router.delete('/:askId', askController.delete);
router.patch('/selection/:askId', askController.selection.patch);

module.exports = router;
