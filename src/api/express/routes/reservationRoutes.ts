import { ReservationApplication } from '@/modules/reservations/reservations.application.ts';
import HandleAsync from '@/util/HandleAsync.ts';
import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/authMiddleware.ts';

export const reservationRouter = Router();

const reservationApplication = new ReservationApplication();

reservationRouter.route('/').post(
	HandleAsync(async (req, res) => {
		const reservation = await reservationApplication.createOne(req.body);

		return res
			.status(201)
			.json({ status: 'success', data: { reservation } });
	}),
);

reservationRouter.use(protect);

reservationRouter.get(
	'/',
	restrictTo('admin'),
	HandleAsync(async (req, res) => {
		const reservations = await reservationApplication.getCollection({
			relations: { user: true, showTime: true, seat: true },
		});

		return res.status(200).json({
			status: 'success',
			len: reservations.length,
			data: { reservations },
		});
	}),
);
