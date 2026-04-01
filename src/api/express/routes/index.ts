import type { Application } from 'express';
import { authRouter } from './authRoutes.js';
import { movieRouter } from './movieRoutes.js';
import { showTimeRouter } from './showTimeRoutes.js';
import { cinemaRouter } from './cinemaRoutes.js';
import { reservationRouter } from './reservationRoutes.js';
import seatReservationRouter from './seatReservationsRoutes.js';

export default {
	attach: (app: Application) => {
		app.use('/auth', authRouter);
		app.use('/movies', movieRouter);
		app.use('/showtimes', showTimeRouter);
		app.use('/cinemas', cinemaRouter);
		app.use('/reservations', reservationRouter);
		app.use('/seatReservations', seatReservationRouter);
	},
};
