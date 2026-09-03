import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { signToken } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-me';

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(String(email).toLowerCase().trim());
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
  const token = signToken(user);
  res.json({
    success: true,
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role }
  });
});

router.get('/me', (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success: false });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: payload });
  } catch {
    res.status(401).json({ success: false });
  }
});

export default router;
