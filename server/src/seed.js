import 'dotenv/config';
import bcrypt from 'bcryptjs';
import db from './db.js';

const isProduction = process.env.NODE_ENV === 'production';
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME || 'AURA Admin';

if (isProduction && (!email || !password)) {
  throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured in production');
}

const adminEmail = email || 'admin@auraofficial.in';
const adminPassword = password || 'AuraAdmin@2026';

const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
if (!existing) {
  const hash = bcrypt.hashSync(adminPassword, 12);
  db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run(
    adminEmail,
    hash,
    name,
    'admin'
  );
  console.log(`Seeded admin user: ${adminEmail}`);
} else {
  console.log(`Admin already exists: ${adminEmail}`);
}

const defaults = {
  siteName: 'AURA Digital',
  siteUrl: process.env.SITE_URL || 'https://auraofficial.in',
  contactEmail: 'vs8890864@gmail.com',
  trackingEnabled: 'true'
};

const insert = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
for (const [key, value] of Object.entries(defaults)) {
  insert.run(key, value);
}
