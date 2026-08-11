const express = require('express');
const router = express.Router();

// GET /api/contacts - Get all contacts (admin only)
router.get('/', (req, res) => {
  res.json({ message: 'Get all contacts - to be implemented with database' });
});

// GET /api/contacts/:id - Get contact by ID (admin only)
router.get('/:id', (req, res) => {
  res.json({ message: `Get contact ${req.params.id} - to be implemented with database` });
});

// POST /api/contacts - Create contact
router.post('/', (req, res) => {
  res.json({ message: 'Create contact - to be implemented with database' });
});

// PUT /api/contacts/:id - Update contact status (admin only)
router.put('/:id', (req, res) => {
  res.json({ message: `Update contact ${req.params.id} - to be implemented with database` });
});

// DELETE /api/contacts/:id - Delete contact (admin only)
router.delete('/:id', (req, res) => {
  res.json({ message: `Delete contact ${req.params.id} - to be implemented with database` });
});

module.exports = router;