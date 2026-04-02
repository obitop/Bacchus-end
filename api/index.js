import 'reflect-metadata';
import { app } from '../dist/api/express/server.js';
import { initDB } from '../dist/data-access/typeorm/postgres/DataSource.js';

let dbReady = false;

console.log("Index.js handler loaded. Awaiting requests...");

export default async function handler(req, res) {
	if (!dbReady) {
		try {
			await initDB();
			dbReady = true;
		} catch (err) {
			console.error('Database connection failed:', err);
			res.status(200).json({ status: 'fail', message: 'Database connection failed' });
			return;
		}
	}
	app(req, res);
}
