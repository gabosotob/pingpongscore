const { Router } = require('express');

const userService = require('../services/user.service');

const router = Router();
module.exports = router;

router.get('/', userService.getUsers);
