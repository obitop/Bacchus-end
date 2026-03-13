import { app } from './server.ts';
import 'reflect-metadata';

const { PORT } = process.env;

app.listen(PORT || 3000, (err) => {
	console.log('Listening on ', PORT || 3000);
});
