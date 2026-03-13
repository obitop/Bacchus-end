import { configDotenv } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.ts';
import 'pq';
import { Movie } from '../entities/Movie.ts';
import { ShowTime } from '../entities/ShowTime.ts';
import { Cinema } from '../entities/Cinema.ts';
import { Seat } from '../entities/Seat.ts';
import { Reservation } from '../entities/reservation.ts';
configDotenv({ quiet: true });

export const dataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'tarek',
	password: 'password',
	database: 'movie_reservation',
	synchronize: true,
	entities: ['./src/data-access/typeorm/entities/*.ts'],
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
