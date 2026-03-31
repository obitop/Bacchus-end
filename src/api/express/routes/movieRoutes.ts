import { MovieApplication } from '@/modules/movies/movies.application.ts';
import HandleAsync from '@/util/HandleAsync.ts';
import { Router, type Request, type Response } from 'express';
import { showTimeRouter } from './showTimeRoutes.ts';
import { protect, restrictTo } from '../middlewares/authMiddleware.ts';

export const movieRouter = Router();

const movieApplication = new MovieApplication();

movieRouter.use('/:movieId/showtimes', showTimeRouter);

movieRouter
	.route('/')
	.post(protect, restrictTo('admin'), async (req: Request, res: Response) => {
		const movie = await movieApplication.createOne(req.body);

		res.status(201).json({
			status: 'success',
			message: 'Movie Created Successfully',
			data: { movie },
		});

	})
	.get(
		HandleAsync(async (req: Request, res: Response) => {
			console.log('getting movies');
			console.log(req.query);

			const movies = await movieApplication.getCollection({});

			res.status(200).json({
				status: 'success',
				len: movies?.length,
				data: { movies },
			});
		}),
	);

movieRouter
	.route('/:id')
	.get(
		HandleAsync(async (req, res) => {
			const { id } = req.params;
			const movie = await movieApplication.getOneByID(Number(id));

			return res.status(200).json({
				status: 'success',
				data: { movie },
			});
		}),
	)
	.patch(
		HandleAsync(async (req, res) => {
			const { id } = req.params;
			const updated = await movieApplication.updateOne(
				Number(id),
				req.body,
			);

			return res.status(200).json({
				status: 'success',
				data: { updated },
			});
		}),
	).put(HandleAsync(async (req, res) => {
		const updated = await movieApplication.updateOne(Number(req.params.id), req.body);

		return res.status(200).json({
			status: "success",
			data: {updated}
		})
	}))
	.delete(
		HandleAsync(async (req, res) => {
			const deleted = await movieApplication.deleteOne(
				Number(req.params.id),
			);

			return res.status(200).json({
				status: 'success',
				data: { deleted },
			});
		}),
	);
