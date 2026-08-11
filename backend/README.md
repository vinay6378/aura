# Backend API Structure

This directory contains the backend API structure for AURA Digital.

## Technology Stack

- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Contacts
- `GET /api/contacts` - Get all contacts (admin only)
- `GET /api/contacts/:id` - Get contact by ID (admin only)
- `POST /api/contacts` - Create contact
- `PUT /api/contacts/:id` - Update contact status (admin only)
- `DELETE /api/contacts/:id` - Delete contact (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Settings
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings (admin only)

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Helmet security headers
- Input validation
- SQL injection prevention (Prisma)

## Database Schema

See `prisma/schema.prisma` for the complete database schema.