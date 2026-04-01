import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1711900000000 implements MigrationInterface {
	name = 'InitialSchema1711900000000';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// Enable uuid extension
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

		// User table
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "user" (
				"id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
				"email" varchar NOT NULL UNIQUE,
				"password" varchar NOT NULL,
				"role" varchar NOT NULL DEFAULT 'user',
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now()
			)
		`);

		// Movie table
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "movie" (
				"id" SERIAL PRIMARY KEY,
				"imdb_id" varchar,
				"title" varchar(30) NOT NULL,
				"description" text,
				"genre" varchar,
				"duration" integer NOT NULL,
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now()
			)
		`);

		// Cinema table
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "cinema" (
				"id" SERIAL PRIMARY KEY,
				"name" varchar NOT NULL,
				"numOfRows" integer NOT NULL,
				"seatsPerRow" integer NOT NULL,
				"close_time" TIMESTAMP,
				"owner" varchar
			)
		`);

		// Seat table
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "seat" (
				"id" SERIAL PRIMARY KEY,
				"row" numeric NOT NULL,
				"col" numeric NOT NULL,
				"type" varchar NOT NULL DEFAULT 'regular',
				"cinemaId" integer REFERENCES "cinema"("id") ON DELETE CASCADE
			)
		`);

		// ShowTime table
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "show_time" (
				"id" SERIAL PRIMARY KEY,
				"display_date" TIMESTAMP NOT NULL,
				"price" numeric NOT NULL,
				"movieId" integer REFERENCES "movie"("id") ON DELETE CASCADE,
				"cinemaId" integer REFERENCES "cinema"("id") ON DELETE CASCADE,
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now()
			)
		`);

		// Reservation table
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "reservations" (
				"id" SERIAL PRIMARY KEY,
				"state" varchar NOT NULL DEFAULT 'pending',
				"userId" uuid REFERENCES "user"("id") ON DELETE CASCADE,
				"showTimeId" integer REFERENCES "show_time"("id") ON DELETE CASCADE,
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now()
			)
		`);

		// SeatReservation table
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "seat_reservation" (
				"id" SERIAL PRIMARY KEY,
				"seatId" integer REFERENCES "seat"("id") ON DELETE CASCADE,
				"showTimeId" integer REFERENCES "show_time"("id") ON DELETE CASCADE,
				"reservationId" integer REFERENCES "reservations"("id") ON DELETE CASCADE
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS "seat_reservation"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "reservations"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "show_time"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "seat"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "cinema"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "movie"`);
		await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
	}
}
