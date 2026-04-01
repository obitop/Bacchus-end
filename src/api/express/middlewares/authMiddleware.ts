import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type TokenPayload } from '../auth/jwt.js';
import { userRepo } from '@/data-access/typeorm/postgres/DataSource.js';
import type { User } from '@/data-access/typeorm/entities/User.js';
import HandleAsync from '@/util/HandleAsync.js';
import { AppError } from '@/interfaces/Errors/AppError.js';

declare global {
	namespace Express {
		interface Request {
			user: User;
		}
	}
}

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return res.status(401).json({
				status: 'fail',
				message: 'Authentication required. Please log in.',
			});
		}

		const decoded = verifyToken(token);
		const user = await userRepo.findOne({
			where: { id: decoded.userId },
			relations: { reservations: { showTime: true } },
		});

		if (!user) {
			return res.status(200).json({
				status: 'fail',
				message: 'User linked to this token no longer exists',
			});
		}

		req.user = user;

		next();
	} catch (error) {
		return res.status(401).json({
			status: 'fail',
			message: 'Invalid or expired token. Please log in again.',
		});
	}
};

// should be moved elsewhere central
type Role = 'user' | 'admin';

// Runs After protect
export const restrictTo = (role: Role) =>
	HandleAsync(async (req, res, next) => {
		const user = req.user;

		if (role !== user.role) {
			console.error('unpreviliged user');
			throw new AppError(401, "you don't have enough previliege");
		} else {
			console.log('valid user');
			next();
		}
	});
