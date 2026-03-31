import { SeatReservation } from '@/data-access/typeorm/entities/SeatReservation.ts';
import { SeatReservationRepo } from '@/data-access/typeorm/postgres/DataSource.ts';
import { AppError } from '@/interfaces/Errors/AppError.ts';
import { CrudApplication } from '@/util/CrudApplication.ts';
import { SeatReservationService } from './seatReservations.service.ts';

const seatReservationService = new SeatReservationService(SeatReservationRepo);

export class SeatReservationApplication extends CrudApplication<SeatReservation> {
	preGetCollection() {
		// throw new Error('Method not implemented.');
	}

	constructor() {
		super(seatReservationService);
	}

}
