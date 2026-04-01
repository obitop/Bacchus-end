import { Seat } from '@/data-access/typeorm/entities/Seat.js';
import { seatRepo } from '@/data-access/typeorm/postgres/DataSource.js';
import { CrudApplication } from '@/util/CrudApplication.js';
import { SeatService } from './seats.service.js';

const seatService = new SeatService(seatRepo);

export class SeatApplication extends CrudApplication<Seat> {
	override preGetCollection() {}

	constructor() {
		super(seatService);
	}
}
