const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

router.post('/signup', userController.signup.post);
router.post('/login', userController.login.post);
router.post('/logout', userController.logout.post);
router.get('/:userName', userController.get);
router.patch('/:userName', userController.patch);
router.delete('/', userController.delete);

module.exports = router;
