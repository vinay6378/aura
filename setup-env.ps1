# Setup Environment Variables Script
# Run this script to set up the .env file with production credentials

$envFile = ".env"
$envContent = @"
# Site Configuration
REACT_APP_SITE_NAME=AURA Digital
REACT_APP_SITE_URL=https://auraofficial.in
REACT_APP_CONTACT_EMAIL=vs8890864@gmail.com
REACT_APP_CONTACT_PHONE=+91 90798 85925

# Admin Configuration
REACT_APP_ADMIN_USERNAME=@auratechai@gmail.com
REACT_APP_ADMIN_PASSWORD=@x0sb1kkh3k

# API Configuration (for future backend integration)
REACT_APP_API_URL=https://api.auraofficial.in
REACT_APP_API_TIMEOUT=30000

# Social Media Links
REACT_APP_FACEBOOK_URL=https://facebook.com/auraofficial
REACT_APP_TWITTER_URL=https://twitter.com/auraofficial
REACT_APP_LINKEDIN_URL=https://linkedin.com/company/auraofficial
REACT_APP_INSTAGRAM_URL=https://instagram.com/auraofficial

# Analytics (for future integration)
REACT_APP_GA_TRACKING_ID=
REACT_APP_HOTJAR_ID=

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_CHAT=false
REACT_APP_ENABLE_NOTIFICATIONS=false
"@

# Write to .env file
$envContent | Out-File -FilePath $envFile -Encoding utf8

Write-Host "Environment file has been configured successfully!" -ForegroundColor Green
Write-Host "Admin Username: @auratechai@gmail.com" -ForegroundColor Yellow
Write-Host "Admin Password: @x0sb1kkh3k" -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Make sure to add .env to .gitignore to keep credentials secure!" -ForegroundColor Red