# Deployment Guide for AURA Digital — Hostinger Shared Hosting

## Architecture

AURA Digital is a **static React SPA** with **no server-side code**.

- Frontend: React (Create React App), built to static files in `build/`
- Backend: Supabase (cloud-hosted PostgreSQL + Auth)
- Hosting: Hostinger shared hosting (static files only — no Node.js required)

The website talks directly to Supabase from the browser. No PHP, Node.js, or
Express server runs on Hostinger.

## Prerequisites

- Hostinger shared hosting account
- Domain: `auraofficial.in`
- FTP credentials from Hostinger hPanel
- Supabase project (already provisioned)

## Step 1: Build the Project

```bash
npm install
npm run build
```

This produces a `build/` folder with all static assets.

## Step 2: Upload to Hostinger

### Option A: File Manager (Easiest)

1. Go to Hostinger hPanel → File Manager
2. Navigate to `public_html`
3. Upload **all files** from the `build/` folder (including `.htaccess`)
4. Make sure `.htaccess` is in the root of `public_html`

### Option B: FTP Client

1. Use FileZilla or WinSCP
2. Connect with your Hostinger FTP credentials
3. Upload `build/` contents to `public_html/`
4. Ensure `.htaccess` is uploaded (it may be hidden — enable "show hidden files")

## Step 3: Verify Deployment

1. Visit `https://auraofficial.in` — the site should load
2. Test the contact form — submissions are stored in Supabase
3. Visit `https://auraofficial.in/admin/signup` to create your admin account
4. Sign in at `https://auraofficial.in/admin/login`
5. The admin dashboard at `/admin` shows leads, analytics, and live visitors

## CI/CD Pipeline (Automatic Deployment via GitHub Actions)

The workflow in `.github/workflows/ci.yml` automatically:
1. Builds the project on push to `main` or `develop`
2. Runs `npm audit` for security
3. Deploys via FTP to Hostinger

### GitHub Secrets Required

Go to your GitHub repository → Settings → Secrets and variables → Actions:

**Production:**
- `FTP_HOST` — Hostinger FTP host (e.g., `145.79.213.112`)
- `FTP_USERNAME` — FTP username (e.g., `u685049710.auraofficial.in`)
- `FTP_PASSWORD` — Your FTP password from Hostinger hPanel
- `FTP_PATH` — Remote path (e.g., `/home/u685049710/domains/auraofficial.in/public_html`)

**Staging (optional):**
- `FTP_HOST_STAGING` — Staging FTP host
- `FTP_PATH_STAGING` — Staging remote path

- Push to `main` → auto-deploys to production
- Push to `develop` → auto-deploys to staging (if configured)

## Environment Variables

The Supabase connection details are baked into the build via `.env.production`:
- `REACT_APP_SUPABASE_URL` — Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` — Supabase anonymous key (public, safe for frontend)

No server-side environment variables are needed.

## Admin Account Setup

1. After deploying, visit `https://auraofficial.in/admin/signup`
2. Create your admin account with email and password
3. Sign in at `https://auraofficial.in/admin/login`
4. All authenticated users have admin access to the dashboard

## Troubleshooting

### 404 Errors on Refresh
- Ensure `.htaccess` is uploaded to `public_html/`
- Check that `mod_rewrite` is enabled on Hostinger (it is by default)

### Contact Form Not Working
- The form writes directly to Supabase — check browser console for errors
- Verify `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` are correct
- Check Supabase dashboard → Table Editor → `contacts` to see submissions

### Admin Dashboard Shows No Data
- Sign in first at `/admin/login`
- If you haven't created an account yet, go to `/admin/signup`
- Check that RLS policies are enabled (they are by default after migration)

### Build Issues
- Delete `node_modules` and run `npm install`
- Run `npm run build` with `CI=false` if treating warnings as errors

## What NOT to Deploy

The following directories are **not needed** on Hostinger and should not be uploaded:
- `server/` — obsolete Express server (replaced by Supabase)
- `admin/` — obsolete standalone Vite admin panel (admin is now at `/admin` in the main app)
- `backend/` — obsolete Python backend
- `node_modules/` — build dependencies only
