# Deployment Guide for Aura Website - Hostinger Shared Hosting

## Prerequisites
- GitHub repository with this code
- Hostinger shared hosting account
- Domain: auraofficial.in
- FTP credentials from Hostinger

## Step 1: Get Hostinger FTP Credentials

Your Hostinger FTP credentials:
- **FTP Host**: `145.79.213.112`
- **FTP Username**: `u685049710.auraofficial.in`
- **FTP Port**: `21`
- **Remote Path**: `/home/u685049710/domains/auraofficial.in/public_html`

You still need your FTP password from Hostinger hPanel.

## Step 2: Add GitHub Secrets for CI/CD

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following secrets:

**For Production:**
- `FTP_HOST`: `145.79.213.112`
- `FTP_USERNAME`: `u685049710.auraofficial.in`
- `FTP_PASSWORD`: Your FTP password (get from Hostinger hPanel)
- `FTP_PATH`: `/home/u685049710/domains/auraofficial.in/public_html`

**For Staging (optional):**
- `FTP_HOST_STAGING`: Staging FTP host
- `FTP_PATH_STAGING`: Staging remote path (e.g., `/public_html/staging`)

## Step 3: Manual Deployment (Quick Start)

### Option A: Using File Manager (Easiest)
1. Run `npm run build` locally
2. Go to Hostinger hPanel → File Manager
3. Navigate to `public_html`
4. Upload all files from the `build/` folder
5. Also upload the `api/` folder to `public_html/`

### Option B: Using FTP Client
1. Use FileZilla or WinSCP
2. Connect with your FTP credentials
3. Upload `build/` contents to `public_html/`
4. Upload `api/` folder to `public_html/`

### Option C: Using Command Line
```bash
npm run build
# Use lftp or ncftpput to upload
lftp -u username,password -e "mirror -R build/ /public_html/" ftp.auraofficial.in
```

## Step 4: Deploy PHP Backend

1. Upload the `api/` folder to your `public_html/` directory
2. Ensure `contact.php` is at `public_html/api/contact.php`
3. Test the API: `https://auraofficial.in/api/contact.php`

## Step 5: Configure Domain

1. In Hostinger hPanel → Domains
2. Point `auraofficial.in` to your hosting
3. DNS should already be configured if domain is from Hostinger
4. If external domain, update nameservers to Hostinger's

## Contact Form API

The contact form uses a PHP backend located at:
- `api/contact.php`

### Current Behavior
- Sends email to `vs8890864@gmail.com`
- Logs submissions to `contact_submissions.log`
- Validates required fields and email format

### Configuration
Edit `api/contact.php` to change:
- Recipient email (line 28)
- Email subject format (line 29)

### Email Requirements
Hostinger PHP mail() function works by default. If emails don't arrive:
1. Check Hostinger email settings
2. Verify SPF/DKIM records
3. Consider using SMTP instead (requires additional setup)

## Environment Variables

### Development (.env.development)
- Uses localStorage for contact form
- No API calls

### Production (.env.production)
- Uses PHP backend: `/api`
- Real API endpoints at `/api/contact.php`

## CI/CD Pipeline (Automatic Deployment)

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:
1. Runs tests on Node 20.x and 22.x
2. Runs security scans (npm audit, Snyk)
3. Builds the project
4. Deploys via FTP on push to main/develop branches

### Automatic Deployment Setup
- Push to `main` branch → Auto-deploys to production
- Push to `develop` branch → Auto-deploys to staging (if configured)

## Troubleshooting

### 404 Errors on Refresh
- Ensure `.htaccess` is uploaded to `public_html/`
- Check that mod_rewrite is enabled on Hostinger

### Contact Form Not Working
- Verify `api/contact.php` is accessible
- Check PHP error logs in Hostinger hPanel
- Test API directly in browser or with Postman

### Build Issues
- Delete `node_modules` and run `npm install`
- Clear cache: `npm run build` with `CI=false`

### FTP Deployment Fails
- Verify GitHub secrets are correct
- Check FTP credentials work with FileZilla
- Ensure remote path is correct

## Security Notes

- `.htaccess` includes security headers
- PHP input is sanitized
- Email addresses are validated
- Contact submissions are logged for backup

## Monitoring

- Check Hostinger hPanel for server logs
- Monitor GitHub Actions for CI/CD status
- Review `contact_submissions.log` for form submissions
