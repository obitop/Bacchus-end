# Movie Reservation API

A Node.js/Express API for movie theater reservations built with TypeScript, TypeORM, and PostgreSQL.

## Features

- User authentication (JWT)
- Movie, cinema, and showtime management
- Seat reservations with showtime-specific availability
- RESTful API endpoints
- Database seeding for development

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with bcrypt
- **Development**: tsx, nodemon

## Development Setup

1. Install dependencies:

    ```bash
    npm install
    ```

2. Set up PostgreSQL database and update `.env`:

    ```
    DATABASE_URL=postgresql://user:password@localhost:5432/movie_reservation
    JWT_SECRET=your-secret-key
    ```

3. Run database migrations:

    ```bash
    npm run dev:express
    ```

4. Seed the database:
    ```bash
    npm run seed
    ```

## Available Scripts

- `npm run dev:express` - Start development server with hot reload
- `npm run build` - Type check TypeScript (no JS output - uses tsx runtime)
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (protected)

### Movies

- `GET /movies` - List all movies
- `POST /movies` - Create movie (admin)
- `GET /movies/:id` - Get movie details

### Cinemas

- `GET /cinemas` - List all cinemas
- `POST /cinemas` - Create cinema (admin)

### Showtimes

- `GET /showtimes` - List showtimes with filters
- `POST /showtimes` - Create showtime (admin)

### Reservations

- `GET /reservations` - List user reservations
- `POST /reservations` - Create reservation
- `PATCH /reservations/:id/cancel` - Cancel reservation

### Seats

- `GET /seats/available?showtimeId=X` - Get available seats for showtime

## Database Schema

- **Users**: Authentication and user management
- **Movies**: Movie catalog
- **Cinemas**: Theater locations
- **Seats**: Physical seats in cinemas
- **ShowTimes**: Movie screenings at specific times
- **Reservations**: User bookings
- **SeatReservations**: Links seats to reservations per showtime

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the `vercel.json` configuration
3. Set environment variables in Vercel dashboard:
    - `DATABASE_URL` - PostgreSQL connection string
    - `JWT_SECRET` - JWT signing secret
    - `NODE_ENV` - Set to "production"

### Local Production

```bash
npm start
```

The app will start on port 4000 (or PORT env var).

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Environment mode

## CORS Configuration

The API is configured to accept requests from:

- `http://localhost:5173` (Vite dev server)
- `http://localhost:5713` (Alternative dev port)
- Vercel deployment URLs
- Dev tunnel URLs

## Database Seeding

The seeder creates:

- 5 users (1 admin, 4 regular)
- 3 cinemas with different capacities
- 306 seats across all cinemas
- 6 movies
- 46 showtimes (randomized dates ±180 days)
- 4 sample reservations

Run `npm run seed` to populate the database.
