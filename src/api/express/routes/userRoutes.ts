import HandleAsync from '@/util/HandleAsync.ts';
import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.ts';

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
