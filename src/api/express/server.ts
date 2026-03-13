import type { AppError } from '@/interfaces/Errors/AppError.ts';
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import routes from './routes/index.ts';
import morgan from 'morgan';

export const app = express();

app.use(express.json());
app.use(morgan('dev'));

routes.attach(app);

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'ok' });
});

app.all('/*any', (req, res) => {
	res.status(400).json({
		status: 'fail',
		message: `Page ${req.url} Not found`,
	});
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
	console.log(err.stack);
	res.status(err.statusCode || 500).json({
		status: 'fail',
		message: err.message,
	});
});
