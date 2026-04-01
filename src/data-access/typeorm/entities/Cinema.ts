import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Seat } from './Seat.js'; // Import type only
import type { ShowTime } from './ShowTime.js'; // Import type only

@Entity()
export class Cinema {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar', length: 255 })
	name!: string;

	// @Column({type: 'varchar', length: 20})
	// location!: string;

	@Column({ type: 'numeric' })
	numOfRows!: number;

	@Column({ type: 'numeric' })
	seatsPerRow!: number;

	@OneToMany('Seat', (seat: Seat) => seat.cinema)
	seats!: Seat[];

	@OneToMany('ShowTime', (showtime: ShowTime) => showtime.cinema)
	showtimes!: ShowTime[];

	@Column({ type: 'date' })
	close_time!: Date;

	@Column({ type: 'varchar', default: 'tarek' })
	owner!: string;
}
