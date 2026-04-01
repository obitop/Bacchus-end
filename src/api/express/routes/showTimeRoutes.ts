import type { ShowTime } from '@/data-access/typeorm/entities/ShowTime.js';
import { SeatService } from '@/modules/seats/seats.service.js';
import { ShowTimeApplication } from '@/modules/showTimes/showTime.application.js';
import HandleAsync from '@/util/HandleAsync.js';
import { Router } from 'express';
import type { FindOptionsWhere } from 'typeorm';

export const showTimeRouter = Router({ mergeParams: true });
const showTimeApplication = new ShowTimeApplication();

// GET {{url}}/showtimes/
// GET {{url}}/:showTimeId/showtimes/

showTimeRouter
	.route('/')
	.get(
		HandleAsync(async (req, res) => {
			let whereObj: FindOptionsWhere<ShowTime> = {};
			const { movieId } = req.params;

			if (movieId) {
				whereObj = { movie: { id: Number(movieId) } };
			}
			console.log('where no filter: ', whereObj);

			const showtimes = await showTimeApplication.getCollection({
				where: whereObj,
				relations: {
					movie: true,
					cinema: { seats: true },
					seatReservations: { seat: true, reservation: true },
				},
			});

			return res.status(200).json({
				status: 'success',
				len: showtimes?.length,
				data: {
					showtimes,
				},
			});
		}),
	)
	.post(
		HandleAsync(async (req, res) => {
			const newShowTime = await showTimeApplication.createOne(req.body);

			return res.status(201).json({
				status: 'success',
				data: { newShowTime },
			});
		}),
	);

showTimeRouter
	.route('/:id')
	.get(
		HandleAsync(async (req, res) => {
			const { id } = req.params;
			// const showTime = await showTimeApplication.getOneByID(Number(id));
			const showTime = await showTimeApplication.getOne({
				where: { id: Number(id) },
				relations: {
					movie: true,
					cinema: { seats: true },
					seatReservations: { seat: true, reservation: true },
				},
			});

			return res.status(200).json({
				status: 'success',
				data: { showTime },
			});
		}),
	)
	.patch(
		HandleAsync(async (req, res) => {
			const { id } = req.params;
			const updated = await showTimeApplication.updateOne(
				Number(id),
				req.body,
			);

			return res.status(200).json({
				status: 'success',
				data: { updated },
			});
		}),
	)
	.delete(
		HandleAsync(async (req, res) => {
			const deleted = await showTimeApplication.deleteOne(
				Number(req.params.id),
			);

			return res.status(200).json({
				status: 'success',
				data: { deleted },
			});
		}),
	);
