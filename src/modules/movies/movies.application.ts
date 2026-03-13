import { Movie } from '@/data-access/typeorm/entities/Movie.ts';
import { movieRepo } from '@/data-access/typeorm/postgres/DataSource.ts';
import { AppError } from '@/interfaces/Errors/AppError.ts';
import { CrudApplication } from '@/util/CrudApplication.ts';
import { MovieService } from './movies.service.ts';

const movieService = new MovieService(movieRepo);

export class MovieApplication extends CrudApplication<Movie> {
	preGetCollection() {
		// throw new Error('Method not implemented.');
	}

	constructor() {
		super(movieService);
	}

}
