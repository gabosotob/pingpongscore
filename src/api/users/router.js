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
    res.status(500).json({
      ok: false,
      message: "Server Error: Can't Register User",
    });
  }
});
