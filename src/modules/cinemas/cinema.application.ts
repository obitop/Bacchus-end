import type { Cinema } from '@/data-access/typeorm/entities/Cinema.js';
import {
	cinemaRepo,
	seatRepo,
} from '@/data-access/typeorm/postgres/DataSource.js';
import { CrudApplication } from '@/util/CrudApplication.js';
import type { DeepPartial } from 'typeorm';
import { SeatService } from '../seats/seats.service.js';
import { CinemaService } from './cinema.service.js';

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
