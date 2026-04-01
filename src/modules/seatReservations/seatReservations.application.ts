import { SeatReservation } from '@/data-access/typeorm/entities/SeatReservation.js';
import { SeatReservationRepo } from '@/data-access/typeorm/postgres/DataSource.js';
import { AppError } from '@/interfaces/Errors/AppError.js';
import { CrudApplication } from '@/util/CrudApplication.js';
import { SeatReservationService } from './seatReservations.service.js';

const seatReservationService = new SeatReservationService(SeatReservationRepo);

export class SeatReservationApplication extends CrudApplication<SeatReservation> {
	preGetCollection() {
		// throw new Error('Method not implemented.');
	}

	constructor() {
		super(seatReservationService);
	}
}
