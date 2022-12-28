const { Router } = require('express');
const userRouter = require('./users/router');
const gameRouter = require('./games/router');

const router = Router();

router.use('/users', userRouter);
router.use('/games', gameRouter);

module.exports = router;
