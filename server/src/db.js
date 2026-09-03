import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'aura.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    subject TEXT,
    service TEXT,
    message TEXT,
    status TEXT DEFAULT 'new',
    notes TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    visitor_id TEXT,
    started_at TEXT DEFAULT (datetime('now')),
    last_seen TEXT DEFAULT (datetime('now')),
    country TEXT,
    region TEXT,
    city TEXT,
    device TEXT,
    browser TEXT,
    os TEXT,
    language TEXT,
    timezone TEXT,
    referrer TEXT,
    landing_page TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT
  );

  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    path TEXT,
    title TEXT,
    referrer TEXT,
    duration_ms INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    name TEXT,
    payload TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS seo_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    overall_score INTEGER,
    data TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
  CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
  CREATE INDEX IF NOT EXISTS idx_sessions_last_seen ON sessions(last_seen);
  CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at);
`);

export default db;
