import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import type { ShowTime } from './ShowTime.js'; // Import type only

@Entity()
export class Movie {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'varchar' })
	imdb_id!: string;

	@Column({ type: 'varchar', length: 30, nullable: false })
	title!: string;

	@Column({ type: 'text' })
	description!: string;

	@Column('varchar')
	genre!: string;

	// duration in minutes !!
	@Column({ type: 'numeric' })
	duration!: number;

	@OneToMany('ShowTime', (showtime: ShowTime) => showtime.movie)
	showtimes!: ShowTime[];

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
