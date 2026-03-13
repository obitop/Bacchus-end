import type { ShowTime } from '@/data-access/typeorm/entities/ShowTime.ts';
import type { IService } from '@/interfaces/IService.ts';
import type {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
	Repository,
} from 'typeorm';
import type { UpdateResult } from 'typeorm/browser';

export class ShowTimeService implements IService<ShowTime> {
	constructor(private readonly ShowTimeRepo: Repository<ShowTime>) {}

	async getAll(findOptions: FindManyOptions) {
		return this.ShowTimeRepo.find(findOptions);
	}

	async getOne(
		findOneOptions: FindOneOptions<ShowTime>,
	): Promise<ShowTime | null> {
		return this.ShowTimeRepo.findOne(findOneOptions);
	}

	async getOneByID(id: number) {
		return this.ShowTimeRepo.findOneBy({ id });
	}

	async createOne(copy: DeepPartial<ShowTime>) {
		console.log('copy to be created: ', copy);
		const newShowTime = this.ShowTimeRepo.create(copy);

		return this.ShowTimeRepo.save(newShowTime);
	}

	async deleteOne(id: number) {
		return this.ShowTimeRepo.delete({ id });
	}

	async updateOne(
		id: number,
		payload: DeepPartial<ShowTime>,
	): Promise<UpdateResult> {
		return this.ShowTimeRepo.update({ id }, payload);
	}
}
