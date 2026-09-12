import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import db from './db.js';
import './seed.js';
import publicRoutes from './routes/public.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

const app = express();

const origins = (process.env.CORS_ORIGINS || 'https://auraofficial.in,https://www.auraofficial.in,http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS origin not allowed'));
  },
  credentials: true
}));
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
  res.status(err.status || 500).json({ success: false, error: err.message || 'Server error' });
});

const port = Number(process.env.PORT) || 4000;
db.prepare('SELECT 1').get();

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`AURA API running on port ${port}`);
  });
}

export default app;
