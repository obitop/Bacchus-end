import type { ShowTime } from '@/data-access/typeorm/entities/ShowTime.js';
import { CrudApplication } from '@/util/CrudApplication.js';
import { ShowTimeService } from './showTimes.service.js';
import { showTimeRepo } from '@/data-access/typeorm/postgres/DataSource.js';
import type { FindOneOptions } from 'typeorm';

const showTimeService = new ShowTimeService(showTimeRepo);

export class ShowTimeApplication extends CrudApplication<ShowTime> {
	preGetCollection() {
		// throw new Error('Method not implemented.');
	}

	constructor() {
		super(showTimeService);
	}

	override async getOneByID(id: number): Promise<ShowTime | null> {
		const showTime = await showTimeService.getOne({
			where: { id },
			relations: {
				cinema: { seats: true },
				movie: true,
			},
		});
		console.log('showTime: ', showTime);

		if (!showTime) return null;

		(showTime as any).seats = showTime?.cinema.seats;

		return showTime;
	}
}
