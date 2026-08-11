const express = require('express');
const router = express.Router();

// GET /api/settings - Get site settings
router.get('/', (req, res) => {
  res.json({ message: 'Get site settings - to be implemented with database' });
});

// PUT /api/settings - Update site settings (admin only)
router.put('/', (req, res) => {
  res.json({ message: 'Update site settings - to be implemented with database' });
});

module.exports = router;