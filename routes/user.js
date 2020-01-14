const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

router.post('/signup', userController.signup.post);
router.post('/login', userController.login.post);
router.post('/logout', userController.logout.post);
router.get('/:userId', userController.get);
router.delete('/', userController.delete);

module.exports = router;
