import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.js';
import 'pq';
import { Movie } from '../entities/Movie.js';
import { ShowTime } from '../entities/ShowTime.js';
import { Cinema } from '../entities/Cinema.js';
import { Seat } from '../entities/Seat.js';
import { Reservation } from '../entities/reservation.js';
import { SeatReservation } from '../entities/SeatReservation.js';
configDotenv({ quiet: true });

const DB_URL =
	process.env.DB_URL ||
	'postgres://tarek:password@localhost:5432/movie_reservation';

export const dataSource = new DataSource({
	type: 'postgres',
	url: DB_URL,
	synchronize: process.env.NODE_ENV !== 'production',
	entities: [
		User,
		Movie,
		ShowTime,
		Cinema,
		Seat,
		Reservation,
		SeatReservation,
	],
	ssl: process.env.NODE_ENV === 'production'
		? { rejectUnauthorized: false }
		: false,
	migrations: ['dist/data-access/typeorm/postgres/migrations/*.js'],
	migrationsRun: true,
});

let initPromise: Promise<DataSource> | null = null;

export function initDB(): Promise<DataSource> {
	if (dataSource.isInitialized) {
		return Promise.resolve(dataSource);
	}
	if (!initPromise) {
		initPromise = dataSource.initialize().then((ds) => {
			console.log('Database Initialized');
			return ds;
		});
	}
	return initPromise;
}

export const movieRepo = dataSource.getRepository(Movie);
export const userRepo = dataSource.getRepository(User);
export const showTimeRepo = dataSource.getRepository(ShowTime);
export const cinemaRepo = dataSource.getRepository(Cinema);
export const seatRepo = dataSource.getRepository(Seat);
export const reservationRepo = dataSource.getRepository(Reservation);
export const SeatReservationRepo = dataSource.getRepository(SeatReservation);
