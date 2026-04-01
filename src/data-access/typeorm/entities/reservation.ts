import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Seat } from './Seat.js';
import type { ShowTime } from './ShowTime.js'; // Import type only
import type { User } from './User.js'; // Import type only
import type { SeatReservation } from './SeatReservation.js'; // Import type only

@Entity({ name: 'reservations' })
export class Reservation {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne('User', (user: User) => user.reservations, {})
	user!: User;

	@ManyToOne('ShowTime', (showTime: ShowTime) => showTime.reservations)
	showTime!: ShowTime;

	@OneToMany(
		'SeatReservation',
		(seatReservation: SeatReservation) => seatReservation.reservation,
	)
	seatReservations!: SeatReservation[];

	@Column({
		type: 'enum',
		enum: ['pending', 'confirmed', 'cancelled'],
		default: 'pending',
	})
	state!: 'pending' | 'confirmed' | 'cancelled';

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
