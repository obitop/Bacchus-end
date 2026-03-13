import type {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
} from 'typeorm';
import type { DeleteResult } from 'typeorm/browser';
import type { UpdateResult } from 'typeorm/browser';

export interface IService<T> {
	getAll: (findOptions: FindManyOptions<T>) => Promise<T[]>;
	getOne: (findOneOptions: FindOneOptions<T>) => Promise<T | null>;
	getOneByID: (id: number) => Promise<T | null>;

	createOne: (obj: DeepPartial<T>) => Promise<T>;

	updateOne: (
		id: number,
		updateObject: DeepPartial<T>,
	) => Promise<UpdateResult>;

	deleteOne: (id: number) => Promise<DeleteResult>;
}
