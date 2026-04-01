import type { IService } from '@/interfaces/IService.js';
import type {
	DeepPartial,
	Document,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
} from 'typeorm';

export abstract class CrudApplication<T extends Document> {
	constructor(private service: IService<T>) {}

	abstract preGetCollection(): any;

	async getCollection(findOptions: FindManyOptions<T>): Promise<T[]> {
		const records = await this.service.getAll(findOptions);
		// console.log('got records : ', records);
		return records;
	}

	async createOne(payload: DeepPartial<T>) {
		// Probably wrong must change to an actual validator "zod"
		// const err = await validate(One, payload);

		return this.service.createOne(payload);
	}

	async getOne(findOneOptions: FindOneOptions<T>) {
		return this.service.getOne(findOneOptions);
	}

	async getOneByID(id: number) {
		return this.service.getOneByID(id);
	}

	async deleteOne(id: number) {
		const deleteResult = await this.service.deleteOne(id);
	}

	async updateOne(id: number, payload: DeepPartial<T>) {
		const updatedResult = this.service.updateOne(id, payload);

		return updatedResult;
	}
}
