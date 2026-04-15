const express = require('express');
const router = express.Router();

const USER = {
  username: "admin",
  password: "1234"
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    return res.json({
      success: true,
      token: "securetoken123"
    });
  }

  res.status(401).json({ success: false });
});

module.exports = router;
