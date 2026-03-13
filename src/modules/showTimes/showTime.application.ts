import type { ShowTime } from '@/data-access/typeorm/entities/ShowTime.ts';
import { CrudApplication } from '@/util/CrudApplication.ts';
import { ShowTimeService } from './showTimes.service.ts';
import { showTimeRepo } from '@/data-access/typeorm/postgres/DataSource.ts';
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
			where: { id, cinema: { seats: { state: 'free' } } },
			relations: {
				cinema: { seats: true },
			},
		});
		console.log('showTime: ', showTime);

		if (!showTime) return null;

		(showTime as any).seats = showTime?.cinema.seats;

		return showTime;
	}
}
