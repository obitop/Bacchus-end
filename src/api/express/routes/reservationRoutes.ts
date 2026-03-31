import { ReservationApplication } from '@/modules/reservations/reservations.application.ts';
import HandleAsync from '@/util/HandleAsync.ts';
import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/authMiddleware.ts';
import type { User } from '@/data-access/typeorm/entities/User.ts';
import { reservationRepo } from '@/data-access/typeorm/postgres/DataSource.ts';

export const reservationRouter = Router();

const reservationApplication = new ReservationApplication();

reservationRouter.use(protect);

reservationRouter
	.route('/')
	.post(
		HandleAsync(async (req, res) => {
			const reservation = await reservationApplication.createOne({
				user: req.user.id as unknown as User, // Typeorm is weird  or maybe I am
				showTime: req.body.showTime,
				seatReservations: req.body.seatReservations,
			});

			return res
				.status(201)
				.json({ status: 'success', data: { reservation } });
		}),
	)
	.delete(
		HandleAsync(async (req, res) => {
			// Implementation for deleting a reservation
			const deleteResult = await reservationRepo.delete({
				state: 'pending',
			});
			return res.status(200).json({
				status: 'success',
				data: { deleteResult },
			});
		}),
	);

reservationRouter.get(
	'/',
	// restrictTo('admin'),
	HandleAsync(async (req, res) => {
		const reservations = await reservationApplication.getCollection({
			relations: { user: true, showTime: true, seatReservations: true },
		});

		return res.status(200).json({
			status: 'success',
			len: reservations.length,
			data: { reservations },
		});
	}),
);
