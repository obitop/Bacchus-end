import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	EventSubscriber,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	type EntitySubscriberInterface,
	type InsertEvent,
} from 'typeorm';
import { Cinema } from './Cinema.ts';
import { Movie } from './Movie.ts';
import type { Double } from 'typeorm/browser';
import { Reservation } from './reservation.ts';

@Entity()
export class ShowTime {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => Movie, (movie) => movie.showtimes, { onDelete: 'CASCADE' })
	movie!: Movie;

	@ManyToOne(() => Cinema, (cinema) => cinema.showtimes, { eager: true })
	cinema!: Cinema;

	@Column('date')
	display_date!: Date;

	@Column({ type: 'float' })
	price!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => Reservation, (reservation) => reservation.showTime)
	reservations!: Reservation[];
}

@EventSubscriber()
export class showTimeSubscriber implements EntitySubscriberInterface<ShowTime> {
	listenTo(): Function | string {
		return ShowTime;
	}

	beforeInsert(event: InsertEvent<ShowTime>): Promise<any> | void {
		console.log('before inserting movie: ', event.entity.movie.title);
	}
}
