import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';
import { Cinema } from './Cinema.ts';
import { SeatReservation } from './SeatReservation.ts';

export type seatState = 'free' | 'taken';

@Entity()
export class Seat {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Cinema, (cinema) => cinema.seats)
	cinema!: Cinema;

	@Column({ type: 'numeric' })
	row!: number;

	@Column({ type: 'numeric' })
	col!: number;

	@Column({ type: 'varchar', default: 'regular' })
	type!: string;

	@OneToMany(() => SeatReservation, (seatReservation) => seatReservation.seat)
	seatReservations!: SeatReservation[];

}
