import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.ts';
import 'pq';
import { Movie } from '../entities/Movie.ts';
import { ShowTime } from '../entities/ShowTime.ts';
import { Cinema } from '../entities/Cinema.ts';
import { Seat } from '../entities/Seat.ts';
import { Reservation } from '../entities/reservation.ts';
import { SeatReservation } from '../entities/SeatReservation.ts';
configDotenv({ quiet: true });

const DB_URL = process.env.DB_URL || 'postgres://tarek:password@localhost:5432/movie_reservation';

export const dataSource = new DataSource({
	type: 'postgres',
	url: DB_URL,
	synchronize: process.env.NODE_ENV !== 'production', // Auto-sync in dev, disable in prod
	entities: [
		User,
		Movie,
		ShowTime,
		Cinema,
		Seat,
		Reservation,
		SeatReservation,
	],
	ssl: false,
});

dataSource.initialize().then((ds) => {
	console.log('Database Initialized');
});

export const movieRepo = dataSource.getRepository(Movie);
export const userRepo = dataSource.getRepository(User);
export const showTimeRepo = dataSource.getRepository(ShowTime);
export const cinemaRepo = dataSource.getRepository(Cinema);
export const seatRepo = dataSource.getRepository(Seat);
export const reservationRepo = dataSource.getRepository(Reservation);
export const SeatReservationRepo = dataSource.getRepository(SeatReservation);
