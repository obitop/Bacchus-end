import {
	dataSource,
	movieRepo,
	userRepo,
	showTimeRepo,
	cinemaRepo,
	seatRepo,
	reservationRepo,
	SeatReservationRepo,
} from './data-access/typeorm/postgres/DataSource.js';
import { User } from './data-access/typeorm/entities/User.js';
import { Cinema } from './data-access/typeorm/entities/Cinema.js';
import { Movie } from './data-access/typeorm/entities/Movie.js';
import { ShowTime } from './data-access/typeorm/entities/ShowTime.js';
import { Seat } from './data-access/typeorm/entities/Seat.js';
import { Reservation } from './data-access/typeorm/entities/reservation.js';
import { SeatReservation } from './data-access/typeorm/entities/SeatReservation.js';
import type { DeepPartial } from 'typeorm';

async function seedDatabase() {
	console.log('🌱 Starting database seeding...');

	if (!dataSource.isInitialized) {
		console.log('🔌 Initializing database connection...');
		await dataSource.initialize();
	}

	try {
		// Clear existing data (in reverse dependency order)
		console.log('🧹 Clearing existing data...');
		await SeatReservationRepo.createQueryBuilder().delete().execute();
		await reservationRepo.createQueryBuilder().delete().execute();
		await showTimeRepo.createQueryBuilder().delete().execute();
		await seatRepo.createQueryBuilder().delete().execute();
		await movieRepo.createQueryBuilder().delete().execute();
		await cinemaRepo.createQueryBuilder().delete().execute();
		await userRepo.createQueryBuilder().delete().execute();

		// 1. Create Users
		console.log('👥 Creating users...');
		const users = await userRepo.save([
			{
				email: 'admin@cinema.com',
				password: '$2b$10$hashedpassword1', // In real app, hash properly
				role: 'admin' as const,
			},
			{
				email: 'john.doe@example.com',
				password: '$2b$10$hashedpassword2',
				role: 'user' as const,
			},
			{
				email: 'jane.smith@example.com',
				password: '$2b$10$hashedpassword3',
				role: 'user' as const,
			},
			{
				email: 'mike.johnson@example.com',
				password: '$2b$10$hashedpassword4',
				role: 'user' as const,
			},
			{
				email: 'sarah.wilson@example.com',
				password: '$2b$10$hashedpassword5',
				role: 'user' as const,
			},
		]);

		// 2. Create Cinemas
		console.log('🏢 Creating cinemas...');
		const cinemas = await cinemaRepo.save([
			{
				name: 'Grand Cinema Downtown',
				numOfRows: 10,
				seatsPerRow: 15,
				close_time: new Date('2026-03-30T23:00:00Z'),
			},
			{
				name: 'Metroplex Mall',
				numOfRows: 8,
				seatsPerRow: 12,
				close_time: new Date('2026-03-30T22:30:00Z'),
			},
			{
				name: 'Art House Cinema',
				numOfRows: 6,
				seatsPerRow: 10,
				close_time: new Date('2026-03-30T21:00:00Z'),
			},
		]);

		// 3. Create Seats for each Cinema
		console.log('💺 Creating seats...');
		for (const cinema of cinemas) {
			const seats = [];
			for (let row = 1; row <= cinema.numOfRows; row++) {
				for (let col = 1; col <= cinema.seatsPerRow; col++) {
					seats.push({
						row,
						col,
						type: row <= 2 ? 'premium' : 'regular',
						cinema,
					});
				}
			}
			await seatRepo.save(seats);
		}

		// 4. Create Movies
		console.log('🎬 Creating movies...');
		const movies = await movieRepo.save([
			{
				imdb_id: 'tt0111161',
				title: 'The Shawshank Redemption',
				description:
					'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
				genre: 'Drama',
				duration: 142,
			},
			{
				imdb_id: 'tt0068646',
				title: 'The Godfather',
				description:
					'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
				genre: 'Crime, Drama',
				duration: 175,
			},
			{
				imdb_id: 'tt0071562',
				title: 'The Godfather: Part II',
				description:
					'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
				genre: 'Crime, Drama',
				duration: 202,
			},
			{
				imdb_id: 'tt0468569',
				title: 'The Dark Knight',
				description:
					'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
				genre: 'Action, Crime, Drama',
				duration: 152,
			},
			{
				imdb_id: 'tt0050083',
				title: '12 Angry Men',
				description:
					'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
				genre: 'Crime, Drama',
				duration: 96,
			},
			{
				imdb_id: 'tt0108052',
				title: "Schindler's List",
				description:
					'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
				genre: 'Biography, Drama, History',
				duration: 195,
			},
		]);

		// 5. Create ShowTimes
		console.log('⏰ Creating showtimes...');
		const showtimes = [];

		function randInt(min: number, max: number) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function randomDateInRange(daysBack: number, daysForward: number) {
			const now = Date.now();
			const start = now - daysBack * 24 * 60 * 60 * 1000;
			const end = now + daysForward * 24 * 60 * 60 * 1000;
			return new Date(randInt(start, end));
		}

		const showtimeHours = [9, 11, 13, 15, 17, 19, 21, 23];

		// Create showtimes for each movie in each cinema with wide date range and varied hours
		for (const cinema of cinemas) {
			for (const movie of movies) {
				const showCount = randInt(2, 4); // 2-4 showtimes each movie/cinema
				for (let i = 0; i < showCount; i++) {
					const dt = randomDateInRange(180, 180); // +/- 180 days
					const hour =
						showtimeHours[randInt(0, showtimeHours.length - 1)];
					const minute = [0, 15, 30, 45][randInt(0, 3)] as number;
					dt.setHours(hour!, minute, 0, 0);

					showtimes.push({
						movie,
						cinema,
						display_date: dt,
						price: cinema.name.includes('Art House')
							? 12.99 + i * 1.5
							: 15.99 + i * 2,
					});
				}
			}
		}

		const savedShowtimes = await showTimeRepo.save(showtimes);

		// 6. Create some Reservations with SeatReservations
		console.log('🎫 Creating reservations...');

		// Get some seats and showtimes for reservations
		const grandCinema = cinemas[0]!;
		const metroplexCinema = cinemas[1]!;

		const shawshankShowtime = savedShowtimes.find(
			(st) =>
				st.movie.title === 'The Shawshank Redemption' &&
				st.cinema.id === grandCinema.id &&
				st.display_date.getHours() === 18,
		);
		const godfatherShowtime = savedShowtimes.find(
			(st) =>
				st.movie.title === 'The Godfather' &&
				st.cinema.id === metroplexCinema.id &&
				st.display_date.getHours() === 21,
		);
		const darkKnightShowtime = savedShowtimes.find(
			(st) =>
				st.movie.title === 'The Dark Knight' &&
				st.cinema.id === grandCinema.id &&
				st.display_date.getHours() === 14,
		);

		if (shawshankShowtime && godfatherShowtime && darkKnightShowtime) {
			// Get seats for these cinemas
			const grandCinemaSeats = await seatRepo.find({
				where: { cinema: { id: grandCinema.id } },
			});
			const metroplexSeats = await seatRepo.find({
				where: { cinema: { id: metroplexCinema.id } },
			});

			// Create reservations
			const reservations = await reservationRepo.save([
				{
					user: users[1], // john.doe
					showTime: shawshankShowtime,
					state: 'confirmed' as const,
				} as DeepPartial<Reservation>,
				{
					user: users[2], // jane.smith
					showTime: godfatherShowtime,
					state: 'confirmed' as const,
				} as DeepPartial<Reservation>,
				{
					user: users[3], // mike.johnson
					showTime: darkKnightShowtime,
					state: 'pending' as const,
				} as DeepPartial<Reservation>,
				{
					user: users[4], // sarah.wilson
					showTime: shawshankShowtime,
					state: 'confirmed' as const,
				} as DeepPartial<Reservation>,
			]);

			// Create seat reservations
			await SeatReservationRepo.save([
				{
					seat: grandCinemaSeats[0], // Row 1, Col 1
					showTime: shawshankShowtime,
					reservation: reservations[0],
				} as DeepPartial<SeatReservation>,
				{
					seat: grandCinemaSeats[1], // Row 1, Col 2
					showTime: shawshankShowtime,
					reservation: reservations[0],
				} as DeepPartial<SeatReservation>,
				{
					seat: metroplexSeats[5], // Row 1, Col 6
					showTime: godfatherShowtime,
					reservation: reservations[1],
				} as DeepPartial<SeatReservation>,
				{
					seat: grandCinemaSeats[25], // Row 2, Col 11
					showTime: darkKnightShowtime,
					reservation: reservations[2],
				} as DeepPartial<SeatReservation>,
				{
					seat: grandCinemaSeats[45], // Row 4, Col 1
					showTime: shawshankShowtime,
					reservation: reservations[3],
				} as DeepPartial<SeatReservation>,
			]);
		}

		console.log('✅ Database seeding completed successfully!');
		console.log(`📊 Created:`);
		console.log(`   - ${users.length} users`);
		console.log(`   - ${cinemas.length} cinemas`);
		console.log(
			`   - ${cinemas.reduce((sum, c) => sum + c.numOfRows * c.seatsPerRow, 0)} seats`,
		);
		console.log(`   - ${movies.length} movies`);
		console.log(`   - ${savedShowtimes.length} showtimes`);
		console.log(`   - ${4} reservations with seat reservations`);
	} catch (error) {
		console.error('❌ Error seeding database:', error);
		throw error;
	}
}

// Run the seeder
seedDatabase()
	.then(() => {
		console.log('🎉 Seeding process finished!');
		process.exit(0);
	})
	.catch((error) => {
		console.error('💥 Seeding failed:', error);
		process.exit(1);
	});
