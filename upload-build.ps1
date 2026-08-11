# Automated Build and Upload Script for AURA Digital
# This script builds the project and uploads to FTP server

param(
    [string]$ftpUsername = "",
    [string]$ftpPassword = ""
)

$ftpServer = "srv2204-files.hstgr.io"
$ftpPath = "/5cebed5691893c44/files/"
$localPath = ".\build"

# Check if credentials are provided
if ([string]::IsNullOrEmpty($ftpUsername) -or [string]::IsNullOrEmpty($ftpPassword)) {
    Write-Host "ERROR: FTP credentials not provided!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Usage: .\upload-build.ps1 -ftpUsername 'your-username' -ftpPassword 'your-password'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or edit this script and add your credentials directly." -ForegroundColor Yellow
    exit 1
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AURA Digital - Build & Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build the project
Write-Host "Step 1: Building the project..." -ForegroundColor Cyan
Write-Host "Running: npm run build" -ForegroundColor Yellow

$buildResult = npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host ""

# Step 2: Check if build folder exists
if (-not (Test-Path $localPath)) {
    Write-Host "ERROR: Build folder not found at $localPath" -ForegroundColor Red
    exit 1
}

Write-Host "Build folder found at $localPath" -ForegroundColor Green
Write-Host ""

# Step 3: Create FTP script
Write-Host "Step 2: Preparing FTP upload..." -ForegroundColor Cyan

$ftpScript = @"
open $ftpServer
$ftpUsername
$ftpPassword
cd $ftpPath
lcd $localPath
binary
mput *.*
quit
"@

$ftpScriptFile = "ftp-upload-script.txt"
$ftpScript | Out-File -FilePath $ftpScriptFile -Encoding ASCII

Write-Host "FTP script created" -ForegroundColor Green
Write-Host ""

# Step 4: Upload via FTP
Write-Host "Step 3: Uploading to FTP server..." -ForegroundColor Cyan
Write-Host "Server: $ftpServer" -ForegroundColor Yellow
Write-Host "Path: $ftpPath" -ForegroundColor Yellow
Write-Host ""

$uploadResult = ftp -s:$ftpScriptFile

# Clean up
Remove-Item $ftpScriptFile

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deployment Status" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build completed successfully" -ForegroundColor Green
    Write-Host "✓ Files uploaded to FTP server" -ForegroundColor Green
    Write-Host ""
    Write-Host "Upload Location: $ftpServer$ftpPath" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "IMPORTANT: Remember to also upload these files manually:" -ForegroundColor Yellow
    Write-Host "  - .htaccess (from public folder)" -ForegroundColor Yellow
    Write-Host "  - manifest.json (from public folder)" -ForegroundColor Yellow
    Write-Host "  - service-worker.js (from public folder)" -ForegroundColor Yellow
    Write-Host "  - robots.txt (from public folder)" -ForegroundColor Yellow
    Write-Host "  - sitemap.xml (from public folder)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "See deploy-manual.md for detailed instructions." -ForegroundColor Yellow
} else {
    Write-Host "✗ Upload failed!" -ForegroundColor Red
    Write-Host "Please check your FTP credentials and try again." -ForegroundColor Yellow
    Write-Host "See deploy-manual.md for alternative deployment methods." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Done!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan