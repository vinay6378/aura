const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock user data (replace with database queries)
const users = [];

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    // Check if user exists
    if (users.find(u => u.email === email || u.username === username)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      name,
      role: 'viewer',
      status: 'active'
    };

    users.push(user);

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, username: user.username, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Seed default admin user
router.post('/seed-admin', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash('@x0sb1kkh3k', 10);
    
    const adminUser = {
      id: 'admin-001',
      username: '@auratechai@gmail.com',
      email: '@auratechai@gmail.com',
      password: hashedPassword,
      name: 'AURA Admin',
      role: 'admin',
      status: 'active'
    };

    // Check if admin already exists
    const existingAdmin = users.find(u => u.username === '@auratechai@gmail.com');
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }

    users.push(adminUser);
    res.json({ message: 'Admin user seeded successfully', user: { username: adminUser.username, email: adminUser.email, role: adminUser.role } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed admin user' });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status
  });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = router;