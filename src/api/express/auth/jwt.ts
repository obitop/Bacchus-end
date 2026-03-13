import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import type { UUID } from 'crypto';

configDotenv({quiet: true});

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface TokenPayload {
	userId: UUID;
	email: string;
}

export const generateToken = (payload: TokenPayload): string => {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: JWT_EXPIRES_IN as unknown as number,
	});
};

export const verifyToken = (token: string): TokenPayload => {
	return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
