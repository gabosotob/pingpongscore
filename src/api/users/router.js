const { Router } = require('express');

const userService = require('./service');

const router = Router();
module.exports = router;

router.post('/', async (req, res) => {
  const { user: userData } = req.body;

  try {
    const user = await userService.save_user(userData);

    res.status(201).json({ ok: true, message: 'User Created', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Server Error: Can't Register User",
    });
  }
});

router.get('/', async (req, res) => {
  const { id } = req.query;
  let users;

  try {
    switch (true) {
      case typeof id === 'string':
        users = await userService.get_user(id);
        break;

      default:
        users = await userService.get_users();
    }

    res.status(200);
    users.length === 0 && res.status(404);

    res.json({ ok: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Server Error: Can't Register User",
    });
  }
});
