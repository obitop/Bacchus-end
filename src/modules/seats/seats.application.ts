import { Seat } from '@/data-access/typeorm/entities/Seat.ts';
import { seatRepo } from '@/data-access/typeorm/postgres/DataSource.ts';
import { AppError } from '@/interfaces/Errors/AppError.ts';
import { CrudApplication } from '@/util/CrudApplication.ts';
import { SeatService } from './seats.service.ts';

const seatService = new SeatService(seatRepo);

export class SeatApplication extends CrudApplication<Seat> {
	override preGetCollection() {}

	constructor() {
		super(seatService);
	}
}
