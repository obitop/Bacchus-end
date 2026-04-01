import 'reflect-metadata';
import { initDB } from '@/data-access/typeorm/postgres/DataSource.js';
import { app } from './server.js';

const { PORT } = process.env;

initDB()
	.then(() => {
		app.listen(PORT || 3000, (err) => {
			console.log('Listening on ', PORT || 3000);
		});
	})
	.catch((err) => {
		console.error('Failed to initialize database:', err);
		process.exit(1);
	});
