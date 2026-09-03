import 'dotenv/config';
import bcrypt from 'bcryptjs';
import db from './db.js';

const email = process.env.ADMIN_EMAIL || 'admin@auraofficial.in';
const password = process.env.ADMIN_PASSWORD || 'AuraAdmin@2026';
const name = process.env.ADMIN_NAME || 'AURA Admin';

const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
if (!existing) {
  const hash = bcrypt.hashSync(password, 12);
  db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(
    email,
    hash,
    name,
    'admin'
  );
  console.log(`Seeded admin user: ${email}`);
} else {
  console.log(`Admin already exists: ${email}`);
}

const defaults = {
  siteName: 'AURA Digital',
  siteUrl: process.env.SITE_URL || 'https://auraofficial.in',
  contactEmail: 'vs8890864@gmail.com',
  trackingEnabled: 'true'
};

const insert = db.prepare(
  'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)'
);
for (const [key, value] of Object.entries(defaults)) {
  insert.run(key, value);
}
