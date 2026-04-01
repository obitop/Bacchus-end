import { CinemaApplication } from '@/modules/cinemas/cinema.application.js';
import HandleAsync from '@/util/HandleAsync.js';
import { Router } from 'express';

export const cinemaRouter = Router();

const cinemaApplication = new CinemaApplication();

cinemaRouter
	.route('/')
	.get(
		HandleAsync(async (req, res) => {
			const cinemas = await cinemaApplication.getCollection({});

			return res.status(200).json({
				status: 'success',
				len: cinemas.length,
				data: {
					cinemas,
				},
			});
		}),
	)
	.post(
		HandleAsync(async (req, res) => {
			const cinema = await cinemaApplication.createOne(req.body);

			return res
				.status(201)
				.json({ status: 'success', data: { cinema } });
		}),
	);

cinemaRouter
	.route('/:id')
	.get(
		HandleAsync(async (req, res) => {
			const { id } = req.params;
			const showTime = await cinemaApplication.getOneByID(Number(id));

			return res.status(200).json({
				status: 'success',
				data: { showTime },
			});
		}),
	)
	.patch(
		HandleAsync(async (req, res) => {
			const { id } = req.params;
			const updated = await cinemaApplication.updateOne(
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
			const deleted = await cinemaApplication.deleteOne(
				Number(req.params.id),
			);

			return res.status(200).json({
				status: 'success',
				data: { deleted },
			});
		}),
	);
