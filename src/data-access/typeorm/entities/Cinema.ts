import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from './Seat.ts';
import { ShowTime } from './ShowTime.ts';

@Entity()
export class Cinema {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar', length: 20 })
	name!: string;

	// @Column({type: 'varchar', length: 20})
	// location!: string;

	@Column({ type: 'numeric' })
	numOfRows!: number;

	@Column({ type: 'numeric' })
	seatsPerRow!: number;

	@OneToMany(() => Seat, (seat) => seat.cinema)
	seats!: Seat[];

	@OneToMany(() => ShowTime, (showtime) => showtime.cinema)
	showtimes!: ShowTime[];

	@Column({ type: 'date' })
	close_time!: Date;

	@Column({ type: 'varchar', default: 'tarek' })
	owner!: string;
}
