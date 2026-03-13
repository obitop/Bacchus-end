import type { Cinema } from '@/data-access/typeorm/entities/Cinema.ts';
import type { IService } from '@/interfaces/IService.ts';
import type {
	Repository,
	FindManyOptions,
	FindOptionsWhere,
	DeepPartial,
	UpdateResult,
	FindOneOptions,
} from 'typeorm';

export class CinemaService implements IService<Cinema> {
	constructor(private readonly CinemaRepo: Repository<Cinema>) {}

	async getAll(findOptions: FindManyOptions<Cinema>) {
		return this.CinemaRepo.find(findOptions);
	}

	async getOne(
		findOneOptions: FindOneOptions<Cinema>,
	): Promise<Cinema | null> {
		return this.CinemaRepo.findOne(findOneOptions);
	}

	async getOneByID(id: number) {
		return this.CinemaRepo.findOneBy({ id });
	}

	async createOne(copy: DeepPartial<Cinema>) {
		const newCinema = this.CinemaRepo.create(copy);

		return this.CinemaRepo.save(newCinema);
	}

	async deleteOne(id: number) {
		return this.CinemaRepo.delete({ id });
	}

	async updateOne(
		id: number,
		payload: DeepPartial<Cinema>,
	): Promise<UpdateResult> {
		return this.CinemaRepo.update({ id }, payload);
	}
}
