const { Router } = require('express');
const gameService = require('./service');
const celebrate = require('../middleware/celebrations');

const router = Router();

router.post('/', celebrate.game, async (req, res) => {
  const { game: gameData } = req.body;

  try {
    const game = await gameService.save_game(gameData);

    if (game === null)
      return res.status(400).json({ ok: false, messae: ' Invalid Game Data' });

    res.status(201).json({ ok: true, message: 'Game Saved', data: game });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Server Error: Can't Register Game",
    });
  }
});

router.get('/', async (req, res) => {
  const { id } = req.query;
  let games;

  try {
    switch (true) {
      case typeof id === 'string':
        games = await gameService.get_game(id);
        break;

      default:
        games = await gameService.get_games();
    }

    res.status(200);
    games.length === 0 && res.status(404);

    res.json({ ok: true, data: games });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Server Error: Can't Access Games",
    });
  }
});

module.exports = router;
