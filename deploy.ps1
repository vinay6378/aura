# FTP Deployment Script for AURA Digital
# Uploads the build folder to the specified FTP server

$ftpServer = "srv2204-files.hstgr.io"
$ftpPath = "/5cebed5691893c44/files/"
$localPath = ".\build"
$ftpUsername = ""  # Add your FTP username here
$ftpPassword = ""  # Add your FTP password here

Write-Host "Starting deployment to FTP server..." -ForegroundColor Cyan
Write-Host "Server: $ftpServer" -ForegroundColor Yellow
Write-Host "Path: $ftpPath" -ForegroundColor Yellow
Write-Host ""

# Check if build exists
if (-not (Test-Path $localPath)) {
    Write-Host "Error: Build folder not found at $localPath" -ForegroundColor Red
    Write-Host "Please run 'npm run build' first" -ForegroundColor Yellow
    exit 1
}

Write-Host "Build folder found at $localPath" -ForegroundColor Green
Write-Host ""

# Create FTP script file
$ftpScript = @"
open $ftpServer
$ftpUsername
$ftpPassword
cd $ftpPath
lcd $localPath
mput *.*
quit
"@

$ftpScriptFile = "ftp-script.txt"
$ftpScript | Out-File -FilePath $ftpScriptFile -Encoding ASCII

Write-Host "Uploading files to FTP server..." -ForegroundColor Cyan

# Execute FTP upload
ftp -s:$ftpScriptFile

# Clean up
Remove-Item $ftpScriptFile

Write-Host ""
Write-Host "Deployment completed!" -ForegroundColor Green
Write-Host "Files uploaded to: $ftpServer$ftpPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Ensure .htaccess is also uploaded for security headers" -ForegroundColor Yellow