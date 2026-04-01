import { Movie } from '@/data-access/typeorm/entities/Movie.js';
import { movieRepo } from '@/data-access/typeorm/postgres/DataSource.js';
import { AppError } from '@/interfaces/Errors/AppError.js';
import { CrudApplication } from '@/util/CrudApplication.js';
import { MovieService } from './movies.service.js';

const movieService = new MovieService(movieRepo);

export class MovieApplication extends CrudApplication<Movie> {
	preGetCollection() {
		// throw new Error('Method not implemented.');
	}

	constructor() {
		super(movieService);
	}
}
