import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ShowTime } from './ShowTime.ts';

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

	@OneToMany(() => ShowTime, (showtime) => showtime.movie)
	showtimes!: ShowTime[];

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
