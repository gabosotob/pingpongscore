const { Router } = require('express');

const gameService = require('./service');

const router = Router();
module.exports = router;

router.post('/', async (req, res) => {
  const { game: gameData } = req.body;

  try {
    const game = await gameService.save_game(gameData);

    res.status(201).json({ ok: true, message: 'User Created', data: game });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Server Error: Can't Register User",
    });
  }
});
