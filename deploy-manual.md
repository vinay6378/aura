# Manual Deployment Guide for AURA Digital

## FTP Upload Instructions

### Server Details:
- **FTP Server**: srv2204-files.hstgr.io
- **Path**: /5cebed5691893c44/files/
- **Local Build Folder**: `E:\aura1-main\aura1-main\build`

### Step-by-Step Deployment:

#### Option 1: Using FileZilla (Recommended)

1. **Download and Install FileZilla**:
   - Download from: https://filezilla-project.org/
   - Install and open FileZilla

2. **Connect to FTP Server**:
   - Host: `srv2204-files.hstgr.io`
   - Username: [Your FTP username]
   - Password: [Your FTP password]
   - Port: 21 (or as provided by your hosting)
   - Click "Quickconnect"

3. **Navigate to Target Directory**:
   - On the remote server (right side), navigate to: `/5cebed5691893c44/files/`
   - Clear existing files if needed (optional)

4. **Upload Build Files**:
   - On your local computer (left side), navigate to: `E:\aura1-main\aura1-main\build`
   - Select all files in the build folder
   - Drag and drop to the remote server
   - Wait for upload to complete

5. **Upload Additional Files**:
   - Upload `.htaccess` from the `public` folder (important for security)
   - Upload `manifest.json` from the `public` folder (for PWA)
   - Upload `service-worker.js` from the `public` folder (for PWA)
   - Upload `robots.txt` from the `public` folder (for SEO)
   - Upload `sitemap.xml` from the `public` folder (for SEO)

6. **Verify Deployment**:
   - Visit your website URL
   - Check that all pages load correctly
   - Test admin login at `/admin/login`
   - Test PWA installation

#### Option 2: Using Windows Command Line

1. **Open Command Prompt**:
   - Press `Win + R`
   - Type `cmd` and press Enter

2. **Navigate to Build Folder**:
   ```cmd
   cd E:\aura1-main\aura1-main\build
   ```

3. **Use FTP Command**:
   ```cmd
   ftp srv2204-files.hstgr.io
   ```
   - Enter username when prompted
   - Enter password when prompted
   - Navigate to directory: `cd /5cebed5691893c44/files/`
   - Upload files: `mput *.*`
   - Type `quit` to exit

#### Option 3: Using PowerShell Script

1. **Edit the Deploy Script**:
   - Open `deploy.ps1` in a text editor
   - Add your FTP username and password:
     ```powershell
     $ftpUsername = "your-username"
     $ftpPassword = "your-password"
     ```

2. **Run the Script**:
   ```powershell
   .\deploy.ps1
   ```

### Files to Upload:

From the `build` folder, upload:
- All files and folders in `build/static/`
- `index.html`
- `asset-manifest.json`
- `robots.txt` (from public folder)
- `sitemap.xml` (from public folder)
- `.htaccess` (from public folder - CRITICAL for security)
- `manifest.json` (from public folder - for PWA)
- `service-worker.js` (from public folder - for PWA)

### Important Files:

#### `.htaccess` (Security Headers)
**Location**: `public/.htaccess`
**Purpose**: Security headers, HTTPS enforcement, caching
**Must upload**: YES - Critical for security

#### `manifest.json` (PWA)
**Location**: `public/manifest.json`
**Purpose**: Progressive Web App manifest
**Must upload**: YES - For PWA functionality

#### `service-worker.js` (PWA)
**Location**: `public/service-worker.js`
**Purpose**: Offline support and caching
**Must upload**: YES - For PWA functionality

#### `robots.txt` (SEO)
**Location**: `public/robots.txt`
**Purpose**: Search engine crawling instructions
**Must upload**: YES - For SEO

#### `sitemap.xml` (SEO)
**Location**: `public/sitemap.xml`
**Purpose**: Sitemap for search engines
**Must upload**: YES - For SEO

### Post-Deployment Checklist:

- [ ] All files uploaded successfully
- [ ] `.htaccess` uploaded (critical for security)
- [ ] PWA files uploaded (manifest.json, service-worker.js)
- [ ] SEO files uploaded (robots.txt, sitemap.xml)
- [ ] Website loads correctly
- [ ] Admin panel accessible at `/admin/login`
- [ ] Admin login works with credentials
- [ ] All pages load without errors
- [ ] Mobile responsiveness working
- [ ] PWA installable (check browser)
- [ ] SSL/HTTPS working (if configured)

### Troubleshooting:

#### Files Not Uploading:
- Check FTP credentials
- Verify server is accessible
- Check file permissions on server
- Try passive mode in FileZilla

#### Website Not Loading:
- Verify `index.html` is uploaded
- Check file paths in browser console
- Ensure `.htaccess` is uploaded
- Clear browser cache

#### Admin Panel Not Working:
- Verify authentication files are uploaded
- Check localStorage in browser
- Clear browser cache and try again
- Verify environment variables in build

#### PWA Not Working:
- Verify `manifest.json` is uploaded
- Check `service-worker.js` is uploaded
- Ensure HTTPS is enabled (required for PWA)
- Check browser console for errors

### Alternative Deployment Methods:

If FTP doesn't work, consider:

1. **cPanel File Manager**:
   - Login to hosting cPanel
   - Navigate to File Manager
   - Upload build folder files

2. **Git-based Deployment**:
   - If your hosting supports Git
   - Push to repository
   - Hosting auto-deploys

3. **SSH/SFTP**:
   - Use WinSCP or similar tool
   - Connect via SFTP
   - Upload files securely

### Security Reminder:

⚠️ **Important Security Notes**:
- Never upload `.env` file to server
- Never upload node_modules folder
- Ensure `.htaccess` is uploaded for security
- Verify HTTPS is enabled on server
- Change FTP credentials if compromised
- Keep backup of your files locally

### Support:

If you encounter issues:
1. Check this guide first
2. Verify all files are uploaded
3. Check browser console for errors
4. Contact hosting support if FTP connection fails
5. Review hosting documentation

## Quick Reference:

**Build Command**: `npm run build`
**Build Location**: `E:\aura1-main\aura1-main\build`
**FTP Server**: srv2204-files.hstgr.io
**Remote Path**: /5cebed5691893c44/files/
**Admin Login**: /admin/login
**Credentials**: @auratechai@gmail.com / @x0sb1kkh3k