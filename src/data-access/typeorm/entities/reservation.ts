import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Seat } from './Seat.ts';
import { ShowTime } from './ShowTime.ts';
import { User } from './User.ts';

@Entity({ name: 'reservations' })
export class Reservation {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => User, (user) => user.reservations, {})
	user!: User;

	@ManyToOne(() => ShowTime, (showtime) => showtime.reservations)
	showTime!: ShowTime;

	// For simplicity a reservation can only have one seat reserved
	@ManyToOne(() => Seat, (seat) => seat.reservations)
	seat!: Seat;

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
