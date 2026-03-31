import type { AppError } from '@/interfaces/Errors/AppError.ts';
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import routes from './routes/index.ts';
import morgan from 'morgan';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(morgan('dev'));

const ALLOWED_ORIGINS = [
	'http://localhost:5173',
	'http://localhost:5713',
	'https://5174-b19fcff0-70ba-4aec-bc5f-e9767ce291c3.orchids.cloud',
	'https://bacchus-hac7tylnd-obitops-projects.vercel.app',
	'https://bacchus-five.vercel.app',
	'https://kd441fh1-4000.uks1.devtunnels.ms',
];

app.use(cors({
	origin: (origin, callback) => {
		if (!origin || ALLOWED_ORIGINS.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
}));

app.options('/*aa', cors({
	origin: (origin, callback) => {
		if (!origin || ALLOWED_ORIGINS.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
}));

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
