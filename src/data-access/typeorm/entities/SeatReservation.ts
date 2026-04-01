import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from './Seat.js';
import { ShowTime } from './ShowTime.js';
import type { Reservation } from './reservation.js'; // Import type only

@Entity()
export class SeatReservation {
	@PrimaryGeneratedColumn()
	id!: number;

	// @ManyToOne(() => Seat)
	// seat!: Seat;
	@ManyToOne('Seat', (seat: Seat) => seat.id)
	seat!: Seat;

	@ManyToOne('ShowTime', (showTime: ShowTime) => showTime.seatReservations)
	showTime!: ShowTime;

	@ManyToOne(
		'Reservation',
		(reservation: Reservation) => reservation.seatReservations,
		{ onDelete: 'CASCADE' },
	)
	reservation!: Reservation;
}
