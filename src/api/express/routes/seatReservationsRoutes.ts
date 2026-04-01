import { SeatReservationApplication } from '@/modules/seatReservations/seatReservations.application.js';
import HandleAsync from '@/util/HandleAsync.js';
import { Router } from 'express';

const seatReservationRouter = Router();

const seatReservationApplication = new SeatReservationApplication();

seatReservationRouter.route('/').get(
	HandleAsync(async (req, res) => {
		const seatReservations = await seatReservationApplication.getCollection(
			{
				relations: {
					seat: true,
					showTime: true,
					reservation: true,
				},
			},
		);

		return res.status(200).json({
			status: 'success',
			data: {
				seatReservations,
			},
		});
	}),
);

export default seatReservationRouter;
