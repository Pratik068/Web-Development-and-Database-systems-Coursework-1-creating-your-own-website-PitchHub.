# PitchHub Backend

A Node.js/Express.js backend for the PitchHub social networking platform.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup
1. Make sure you have MySQL installed and running
2. Create a `.env` file in the root directory with the following variables:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=pitchhub_db
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

3. Run the database schema:
```bash
mysql -u your_username -p < database.sql
```

### 3. Start the Server
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Pitches
- `POST /api/pitches/create` - Create a new pitch (Authenticated)
- `GET /api/pitches/user` - Get user's pitches (Authenticated)
- `GET /api/pitches` - Get all pitches
- `GET /api/pitches/:id` - Get pitch by ID
- `DELETE /api/pitches/:id` - Delete pitch (Authenticated, owner only)

## Database Schema

The application uses the following main tables:
- `users` - User accounts and authentication
- `pitches` - Pitch submissions
- `comments` - Comments on pitches
- `votes` - Like/dislike votes
- `views` - Pitch view tracking
- `categories` - Predefined pitch categories

## Features

- JWT-based authentication
- File upload support for pitch decks
- User role management (entrepreneur, investor, admin)
- Pitch management with CRUD operations
- Statistics tracking (views, likes, investors reached) 