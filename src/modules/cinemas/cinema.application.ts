import type { Cinema } from '@/data-access/typeorm/entities/Cinema.ts';
import {
	cinemaRepo,
	seatRepo,
} from '@/data-access/typeorm/postgres/DataSource.ts';
import { CrudApplication } from '@/util/CrudApplication.ts';
import type { DeepPartial } from 'typeorm';
import { SeatService } from '../seats/seats.service.ts';
import { CinemaService } from './cinema.service.ts';

const cinemaService = new CinemaService(cinemaRepo);
const seatService = new SeatService(seatRepo);

export class CinemaApplication extends CrudApplication<Cinema> {
	override preGetCollection() {
		console.log('pre Get collection');
	}

	constructor() {
		super(cinemaService);
	}

	// Override ?
	async createOne(payload: DeepPartial<Cinema>): Promise<Cinema> {
		const cinema = await cinemaService.createOne(payload);

		await seatService.addCinemaSeats(
			cinema,
			cinema.numOfRows,
			cinema.seatsPerRow,
		);

		return cinema;
	}
}
