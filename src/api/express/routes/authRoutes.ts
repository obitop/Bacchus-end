import { Router, type Request, type Response } from 'express';
import { dataSource } from '@/data-access/typeorm/postgres/DataSource.ts';
import { User } from '@/data-access/typeorm/entities/User.ts';
import { hashPassword, comparePassword } from '../auth/bcrypt.ts';
import { generateToken } from '../auth/jwt.ts';
import { protect } from '../middlewares/authMiddleware.ts';
import HandleAsync from '@/util/HandleAsync.ts';

export const authRouter = Router();
const userRepository = dataSource.getRepository(User);

authRouter.post(
	'/signup',
	HandleAsync(async (req: Request, res: Response) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				status: 'fail',
				message: 'Please provide email and password',
			});
		}

		const existingUser = await userRepository.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({
				status: 'fail',
				message: 'User with this email already exists',
			});
		}

		const hashedPassword = await hashPassword(password);

		const newUser = userRepository.create({
			email,
			password: hashedPassword,
		});

		await userRepository.save(newUser);

		const token = generateToken({
			userId: newUser.id,
			email: newUser.email,
		});

		return res.status(201).json({
			status: 'success',
			message: 'User created successfully',
			data: {
				user: {
					id: newUser.id,
					email: newUser.email,
					createdAt: newUser.createdAt,
				},
				token,
			},
		});
	}),
);

authRouter.post('/login', async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				status: 'fail',
				message: 'Please provide email and password',
			});
		}

		const user = await userRepository.findOne({
			where: { email },
			select: ['id', 'email', 'password', 'createdAt', 'updatedAt'],
		});

		if (!user) {
			return res.status(401).json({
				status: 'fail',
				message: 'Invalid email or password',
			});
		}

		const isPasswordValid = await comparePassword(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				status: 'fail',
				message: 'Invalid email or password',
			});
		}

		const token = generateToken({
			userId: user.id,
			email: user.email,
		});

		return res.status(200).json({
			status: 'success',
			message: 'Logged in successfully',
			data: {
				user: {
					id: user.id,
					email: user.email,
					createdAt: user.createdAt,
				},
				token,
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: 'error',
			message: 'An error occurred during login',
		});
	}
});

authRouter.post('/logout', protect, (req: Request, res: Response) => {
	return res.status(200).json({
		status: 'success',
		message: 'Logged out successfully',
	});
});

authRouter.get('/me', protect, async (req: Request, res: Response) => {
	try {
		// const user = await userRepository.findOne({
		// 	where: { id: req.user!.userId },
		// });

		const user = req.user;

		if (!user) {
			return res.status(404).json({
				status: 'fail',
				message: 'User not found',
			});
		}

		return res.status(200).json({
			status: 'success',
			data: {
				user: {
					id: user.id,
					email: user.email,
					role: user.role,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				},
			},
		});
	} catch (error) {
		return res.status(500).json({
			status: 'error',
			message: 'An error occurred while fetching user data',
		});
	}
});

authRouter.get(
	'/me/reservations',
	protect,
	HandleAsync(async (req, res) => {
		const user = req.user;

		return res.status(200).json({
			status: 'success',
			len: user.reservations?.length || 0,
			data: {
				reservations: user.reservations,
			},
		});
	}),
);
