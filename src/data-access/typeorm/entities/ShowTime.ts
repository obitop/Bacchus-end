import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	EventSubscriber,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	type EntitySubscriberInterface,
	type InsertEvent,
} from 'typeorm';
import type { Cinema } from './Cinema.js'; // Import type only
import type { Movie } from './Movie.js'; // Import type only
import type { Double } from 'typeorm/browser';
import type { Reservation } from './reservation.js'; // Import type only
import type { SeatReservation } from './SeatReservation.js'; // Import type only

@Entity()
export class ShowTime {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne('Movie', (movie: Movie) => movie.showtimes, {
		onDelete: 'CASCADE',
	})
	movie!: Movie;

	@ManyToOne('Cinema', (cinema: Cinema) => cinema.showtimes, { eager: true })
	cinema!: Cinema;

	@Column('date')
	display_date!: Date;

	@Column({ type: 'float' })
	price!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(
		'Reservation',
		(reservation: Reservation) => reservation.showTime,
	)
	reservations!: Reservation[];

	@OneToMany(
		'SeatReservation',
		(seatReservation: SeatReservation) => seatReservation.showTime,
	)
	seatReservations!: SeatReservation[];
}

@EventSubscriber()
export class showTimeSubscriber implements EntitySubscriberInterface<ShowTime> {
	listenTo(): Function | string {
		return ShowTime;
	}

	beforeInsert(event: InsertEvent<ShowTime>): Promise<any> | void {
		console.log('before inserting movie: ', event.entity.movie.title);
	}
}
