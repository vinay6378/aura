import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Server } from 'socket.io';
import db from './db.js';
import './seed.js';
import publicRoutes from './routes/public.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import { socketAuth } from './middleware/auth.js';

const app = express();
const server = http.createServer(app);

// Change to port 4000 and use the /api/public path
const response = await fetch("http://localhost:4000/api/public/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
});
console.log(response);
const origins = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((s) => s.trim());

const io = new Server(server, {
  cors: { origin: origins, credentials: true }
});
app.set('io', io);

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  const user = token ? socketAuth(token) : null;
  if (!user) return next(new Error('Unauthorized'));
  socket.user = user;
  next();
});

io.on('connection', (socket) => {
  socket.join('admin');
  socket.emit('connected', { ok: true, user: socket.user.email });
});

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: origins, credentials: true }));
app.use(express.json({ limit: '256kb' }));

app.use(
  '/api/public',
  rateLimit({ windowMs: 60_000, max: 120, standardHeaders: true, legacyHeaders: false })
);

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'aura-api', time: new Date().toISOString() });
});

app.use('/api/public', publicRoutes);
app.use('/api/auth', rateLimit({ windowMs: 15 * 60_000, max: 40 }), authRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Server error' });
});

const port = Number(process.env.PORT) || 4000;
server.listen(port, () => {
  db.prepare('SELECT 1').get();
  console.log(`AURA API running on http://localhost:${port}`);
});
