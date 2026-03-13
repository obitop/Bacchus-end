import type { Application } from 'express';
import { authRouter } from './authRoutes.ts';
import { movieRouter } from './movieRoutes.ts';
import { showTimeRouter } from './showTimeRoutes.ts';
import { cinemaRouter } from './cinemaRoutes.ts';
import { reservationRouter } from './reservationRoutes.ts';

export default {
	attach: (app: Application) => {
		app.use('/auth', authRouter);
		app.use('/movies', movieRouter);
		app.use('/showtimes', showTimeRouter);
		app.use('/cinemas', cinemaRouter);
		app.use('/reservations', reservationRouter);
	},
};
