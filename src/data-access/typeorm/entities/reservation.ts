import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Seat } from './Seat.ts';
import { ShowTime } from './ShowTime.ts';
import { User } from './User.ts';
import { SeatReservation } from './SeatReservation.ts';

@Entity({ name: 'reservations' })
export class Reservation {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => User, (user) => user.reservations, {})
	user!: User;

	@ManyToOne(() => ShowTime, (showtime) => showtime.reservations)
	showTime!: ShowTime;

	@OneToMany(() => SeatReservation, (seatReservation) => seatReservation.reservation)
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
