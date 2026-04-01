import HandleAsync from '@/util/HandleAsync.js';
import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.get(
	'/me/reservations',
	protect,
	HandleAsync(async (req, res) => {
		const user = req.user;

		return res.status(200).json({
			status: 'success',
			data: {
				reservations: user.reservations,
			},
		});
	}),
);
