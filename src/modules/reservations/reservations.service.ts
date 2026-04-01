import type { Reservation } from '@/data-access/typeorm/entities/reservation.js';
import type { IService } from '@/interfaces/IService.js';
import type { UUID } from 'node:crypto';
import type {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
	Repository,
} from 'typeorm';
import type { UpdateResult } from 'typeorm/browser';

export class ReservationService implements IService<Reservation> {
	constructor(private readonly reservationRepo: Repository<Reservation>) {}

	async getAll(findOptions: FindManyOptions<Reservation>) {
		return this.reservationRepo.find(findOptions);
	}

	async getOne(
		findOneOptions: FindOneOptions<Reservation>,
	): Promise<Reservation | null> {
		return this.reservationRepo.findOne(findOneOptions);
	}

	async getOneByID(id: number) {
		return this.reservationRepo.findOneBy({ id });
	}

	async createOne(copy: DeepPartial<Reservation>) {
		console.log('reservation copy: ', copy);
		const newreservation = this.reservationRepo.create(copy);

		return this.reservationRepo.save(newreservation);
	}

	async deleteOne(id: number) {
		return this.reservationRepo.delete({ id });
	}

	async updateOne(
		id: number,
		payload: DeepPartial<Reservation>,
	): Promise<UpdateResult> {
		return this.reservationRepo.update({ id }, payload);
	}
}
