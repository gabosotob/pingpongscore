const { Router } = require('express');

const userService = require('./service');

const router = Router();
module.exports = router;

router.get('/', userService.getUsers);
