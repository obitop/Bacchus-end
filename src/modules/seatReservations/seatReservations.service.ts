import type { SeatReservation } from '@/data-access/typeorm/entities/SeatReservation.js';
import type { IService } from '@/interfaces/IService.js';
import type {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	Repository,
} from 'typeorm';
import type { UpdateResult } from 'typeorm/browser';

export class SeatReservationService implements IService<SeatReservation> {
	constructor(
		private readonly SeatReservationRepo: Repository<SeatReservation>,
	) {}

	async getAll(findOptions: FindManyOptions<SeatReservation>) {
		return this.SeatReservationRepo.find(findOptions);
	}

	async getOne(
		findOneOptions: FindOneOptions<SeatReservation>,
	): Promise<SeatReservation | null> {
		return this.SeatReservationRepo.findOne(findOneOptions);
	}

	async getOneByID(id: number) {
		return this.SeatReservationRepo.findOneBy({ id });
	}

	async createOne(copy: DeepPartial<SeatReservation>) {
		const newSeatReservation = this.SeatReservationRepo.create(copy);

		return this.SeatReservationRepo.save(newSeatReservation);
	}

	async deleteOne(id: number) {
		return this.SeatReservationRepo.delete({ id });
	}

	async updateOne(
		id: number,
		payload: DeepPartial<SeatReservation>,
	): Promise<UpdateResult> {
		return this.SeatReservationRepo.update({ id }, payload);
	}
}
