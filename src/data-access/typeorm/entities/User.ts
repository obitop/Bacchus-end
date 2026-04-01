import type { UUID } from 'crypto';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import type { Reservation } from './reservation.js'; // Import type only

type role = 'user' | 'admin';

@Entity({})
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: UUID;

	@Column('varchar', { unique: true, nullable: false })
	email!: string;

	@Column('varchar', { nullable: false, select: false })
	password!: string;

	@Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
	role!: role;

	@OneToMany('Reservation', (reservation: Reservation) => reservation.user)
	reservations!: Reservation[];

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
