import type { Seat } from '@/data-access/typeorm/entities/Seat.js';
import type { IService } from '@/interfaces/IService.js';
import type {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
	Repository,
} from 'typeorm';
import type { UpdateResult } from 'typeorm';

export class SeatService implements IService<Seat> {
	constructor(private readonly SeatRepo: Repository<Seat>) {}

	async getAll(findOptions: FindManyOptions<Seat>) {
		return this.SeatRepo.find(findOptions);
	}

	async getOne(findOneOptions: FindOneOptions<Seat>): Promise<Seat | null> {
		return this.SeatRepo.findOne(findOneOptions);
	}

	async getOneByID(id: number) {
		return this.SeatRepo.findOneBy({ id });
	}

	async createOne(copy: DeepPartial<Seat>) {
		const newSeat = this.SeatRepo.create(copy);

		return this.SeatRepo.save(newSeat);
	}

	async deleteOne(id: number) {
		return this.SeatRepo.delete({ id });
	}

	async updateOne(
		id: number,
		payload: DeepPartial<Seat>,
	): Promise<UpdateResult> {
		return this.SeatRepo.update({ id }, payload);
	}

	async addCinemaSeats(cinema: any, numRows: number, seatPerRow: number) {
		let seats: Seat[] = [];

		// Setup seats in DB for this cinema
		for (let row = 0; row < numRows; row++) {
			for (let col = 0; col < seatPerRow; col++) {
				const seat = this.SeatRepo.create({ cinema, col, row });
				seats.push(seat);
			}
		}
		console.log(seats);
		console.log('inserting for cinema: ', cinema);

		return this.SeatRepo.createQueryBuilder()
			.insert()
			.values(seats)
			.execute();
	}
}
