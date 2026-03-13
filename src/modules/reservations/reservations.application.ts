import { Reservation } from '@/data-access/typeorm/entities/reservation.ts';
import {
	reservationRepo,
	seatRepo,
	showTimeRepo,
} from '@/data-access/typeorm/postgres/DataSource.ts';
import { AppError } from '@/interfaces/Errors/AppError.ts';
import { CrudApplication } from '@/util/CrudApplication.ts';
import { type DeepPartial } from 'typeorm';
import { SeatService } from '../seats/seats.service.ts';
import { ShowTimeService } from '../showTimes/showTimes.service.ts';
import { ReservationService } from './reservations.service.ts';

const reservationService = new ReservationService(reservationRepo);
const seatService = new SeatService(seatRepo);
const showTimeService = new ShowTimeService(showTimeRepo);

export class ReservationApplication extends CrudApplication<Reservation> {
	preGetCollection() {
		// throw new Error('Method not implemented.');
	}

	constructor() {
		super(reservationService);
	}

	override async createOne(
		payload: DeepPartial<Reservation>,
	): Promise<Reservation> {
		// I should search the possibility of combining these two query together

		const isSeatTaken = await seatService.isSeatTaken(
			payload.seat as unknown as number,
		);

		if (isSeatTaken) {
			throw new AppError(
				400,
				'Seat Is Already Taken, please choose another seat',
			);
		}

		// Supposedly chekcing if the Seat is actually linked to this showTime and the cinema
		console.log(
			`Checking seat for this showtime, ${payload.showTime} , ${payload.seat}`,
		);
		const seatValid = await showTimeRepo.exists({
			where: {
				id: Number(payload.showTime),
				cinema: { seats: { id: Number(payload.seat) } },
			},
			relations: { cinema: { seats: true } },
		});

		console.log(seatValid);
		if (!seatValid) {
			throw new AppError(
				400,
				'this seat is not linked to the cinmea of this showTime, please choose a valid seat',
			);
		}

		// We directly reserve the seat FOR NOW we should implement a more realistic scenario
		await seatService.updateOne(payload.seat as unknown as number, {
			state: 'taken',
		});

		return reservationService.createOne(payload);
	}
}
