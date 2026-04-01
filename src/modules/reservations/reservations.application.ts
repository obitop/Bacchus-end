import { Reservation } from '@/data-access/typeorm/entities/reservation.js';
import {
	reservationRepo,
	seatRepo,
	SeatReservationRepo,
	showTimeRepo,
} from '@/data-access/typeorm/postgres/DataSource.js';
import { AppError } from '@/interfaces/Errors/AppError.js';
import { CrudApplication } from '@/util/CrudApplication.js';
import { type DeepPartial } from 'typeorm';
import { SeatService } from '../seats/seats.service.js';
import { ShowTimeService } from '../showTimes/showTimes.service.js';
import { ReservationService } from './reservations.service.js';
import type { Seat } from '@/data-access/typeorm/entities/Seat.js';
import type { ShowTime } from '@/data-access/typeorm/entities/ShowTime.js';

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
		console.log('Payload: ', payload);

		// Checking if the seat is already taken for this showTime
		const isSeatTaken = await SeatReservationRepo.exists({
			where: {
				// IMPORTANT
				// I believe thiss checks only for the first seat in the array but for now we will only allow reserving one seat per reservation, we can implement multiple seats reservation later
				seat: { id: Number(payload.seatReservations![0]!.seat) },
				showTime: { id: Number(payload.showTime) },
			},
		});

		if (isSeatTaken) {
			throw new AppError(
				400,
				'Seat Is Already Taken, please choose another seat',
			);
		}

		// Supposedly chekcing if the Seat is actually linked to this showTime and the cinema
		console.log(
			`Checking seat for this showtime, ${payload.showTime} , ${payload.seatReservations![0]!.seat}`,
		);
		const seatValid = await showTimeRepo.exists({
			where: {
				id: Number(payload.showTime),
				cinema: {
					seats: { id: Number(payload.seatReservations![0]!.seat) },
				},
			},
			relations: { cinema: { seats: true } },
		});

		console.log('seat validity: ', seatValid);
		if (!seatValid) {
			throw new AppError(
				400,
				'this seat is not linked to the cinmea of this showTime, please choose a valid seat',
			);
		}

		const newReservation = await reservationService.createOne({
			showTime: payload.showTime as unknown as ShowTime,
			user: payload.user as any,
		});

		const newSeatReservation = SeatReservationRepo.create({
			seat: Number(payload.seatReservations![0]!.seat) as unknown as Seat,
			showTime: Number(payload.showTime) as unknown as ShowTime,
			reservation: newReservation.id as unknown as Reservation,
		});
		const newSeatReservationSaved =
			await SeatReservationRepo.save(newSeatReservation);
		console.log('newSeatReservationSaved: ', newSeatReservationSaved);

		return newReservation;
	}
}
