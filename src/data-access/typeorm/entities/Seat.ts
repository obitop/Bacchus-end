import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Cinema } from './Cinema.js'; // Import type only
import type { SeatReservation } from './SeatReservation.js';

export type seatState = 'free' | 'taken';

@Entity()
export class Seat {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne('Cinema', (cinema: Cinema) => cinema.seats)
	cinema!: Cinema;

	@OneToMany('SeatReservation', (seatReservation: SeatReservation) => seatReservation.seat)
	seatReservations!: SeatReservation[];

	@Column({ type: 'numeric' })
	row!: number;

	@Column({ type: 'numeric' })
	col!: number;

	@Column({ type: 'varchar', default: 'regular' })
	type!: string;
}
