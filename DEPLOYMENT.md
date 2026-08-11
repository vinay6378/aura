# Deployment Guide for AURA Digital

## Prerequisites

- Node.js 18.x or higher
- Docker and Docker Compose (for containerized deployment)
- Git
- Domain name configured to point to your server

## Environment Setup

### 1. Environment Variables

Copy the example environment files and configure them:

```bash
# Frontend
cp .env.example .env

# Backend
cd backend
cp .env.example .env
```

Update the `.env` files with your actual values:

**Frontend (.env):**
```
REACT_APP_SITE_NAME=AURA Digital
REACT_APP_SITE_URL=https://auraofficial.in
REACT_APP_CONTACT_EMAIL=your-email@example.com
REACT_APP_CONTACT_PHONE=+91 90798 85925
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=your-secure-password
```

**Backend (.env):**
```
DATABASE_URL=postgresql://user:password@localhost:5432/aura_db
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://auraofficial.in
```

## Deployment Options

### Option 1: Docker Compose (Recommended)

1. Build and start containers:
```bash
docker-compose up -d --build
```

2. Check logs:
```bash
docker-compose logs -f
```

3. Stop containers:
```bash
docker-compose down
```

### Option 2: Manual Deployment

#### Frontend Deployment

1. Build the application:
```bash
npm install
npm run build
```

2. Deploy the `build/` folder to your hosting service:
   - **Netlify**: `netlify deploy --prod --dir=build`
   - **Vercel**: `vercel --prod`
   - **AWS S3**: Upload build folder to S3 bucket
   - **Traditional Hosting**: Upload build folder to public HTML directory

#### Backend Deployment

1. Install dependencies:
```bash
cd backend
npm install
```

2. Set up PostgreSQL database

3. Run migrations:
```bash
npx prisma migrate deploy
```

4. Start the server:
```bash
npm start
```

### Option 3: CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:
- Runs tests on every push
- Builds the application
- Runs security scans
- Deploys to staging on `develop` branch
- Deploys to production on `main` branch

To enable:
1. Push your code to GitHub
2. Configure repository secrets in GitHub Settings:
   - `SNYK_TOKEN` (for security scanning)
   - Deployment credentials for your hosting service

## Post-Deployment Checklist

- [ ] Update DNS records to point to your server
- [ ] Configure SSL/TLS certificates (Let's Encrypt recommended)
- [ ] Test all functionality
- [ ] Verify admin panel authentication
- [ ] Test contact form submissions
- [ ] Check mobile responsiveness
- [ ] Verify PWA installation
- [ ] Set up monitoring and error tracking
- [ ] Configure backup strategy
- [ ] Review security headers (check securityheaders.com)

## Security Considerations

1. **Change default credentials** immediately after deployment
2. **Enable HTTPS** for all connections
3. **Keep dependencies updated** regularly
4. **Monitor logs** for suspicious activity
5. **Implement rate limiting** (already configured)
6. **Use environment variables** for sensitive data
7. **Regular security audits** using tools like Snyk or OWASP ZAP

## Monitoring

Recommended monitoring tools:
- **Error Tracking**: Sentry, Bugsnag
- **Performance**: New Relic, Datadog
- **Uptime**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics, Plausible

## Backup Strategy

- **Database**: Daily automated backups to S3 or similar
- **Code**: Git repository (already set up)
- **Configuration**: Version control environment files (without secrets)
- **Media Assets**: Cloud storage with lifecycle policies

## Troubleshooting

### Build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18.x+)
- Verify environment variables are set

### Images not loading
- Check file paths in code
- Verify files exist in `public/` folder
- Check console for 404 errors

### Admin panel not accessible
- Verify authentication is working
- Check localStorage for session data
- Review browser console for errors

### PWA not installing
- Verify manifest.json is accessible
- Check service worker registration
- Ensure HTTPS is enabled (required for PWA)

## Support

For issues or questions:
- Check documentation in `backend/README.md`
- Review GitHub Issues
- Contact development team

## Scaling Considerations

For high-traffic deployments:
- Use CDN for static assets (Cloudflare, AWS CloudFront)
- Implement database read replicas
- Use Redis for session storage and caching
- Consider microservices architecture
- Implement load balancing (Nginx, AWS ALB)