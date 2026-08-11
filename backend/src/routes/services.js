const express = require('express');
const router = express.Router();

// GET /api/services - Get all services
router.get('/', (req, res) => {
  res.json({ message: 'Get all services - to be implemented with database' });
});

// GET /api/services/:id - Get service by ID
router.get('/:id', (req, res) => {
  res.json({ message: `Get service ${req.params.id} - to be implemented with database` });
});

// POST /api/services - Create service (admin only)
router.post('/', (req, res) => {
  res.json({ message: 'Create service - to be implemented with database' });
});

// PUT /api/services/:id - Update service (admin only)
router.put('/:id', (req, res) => {
  res.json({ message: `Update service ${req.params.id} - to be implemented with database` });
});

// DELETE /api/services/:id - Delete service (admin only)
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete service ${req.params.id} - to be implemented with database` });
});

module.exports = router;