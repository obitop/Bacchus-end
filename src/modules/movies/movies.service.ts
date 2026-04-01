import type { Movie } from '@/data-access/typeorm/entities/Movie.js';
import type { IService } from '@/interfaces/IService.js';
import type {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	Repository,
} from 'typeorm';
import type { UpdateResult } from 'typeorm/browser';

export class MovieService implements IService<Movie> {
	constructor(private readonly movieRepo: Repository<Movie>) {}

	async getAll(findOptions: FindManyOptions<Movie>) {
		return this.movieRepo.find(findOptions);
	}

	async getOne(findOneOptions: FindOneOptions<Movie>): Promise<Movie | null> {
		return this.movieRepo.findOne(findOneOptions);
	}

	async getOneByID(id: number) {
		return this.movieRepo.findOneBy({ id });
	}

	async createOne(copy: DeepPartial<Movie>) {
		const newMovie = this.movieRepo.create(copy);

		return this.movieRepo.save(newMovie);
	}

	async deleteOne(id: number) {
		return this.movieRepo.delete({ id });
	}

	async updateOne(
		id: number,
		payload: DeepPartial<Movie>,
	): Promise<UpdateResult> {
		return this.movieRepo.update({ id }, payload);
	}
}
