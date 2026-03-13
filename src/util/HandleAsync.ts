import type {
	Handler,
	NextFunction,
	Request,
	RequestHandler,
	Response,
} from 'express';

// Very Important
interface asyncHandler extends RequestHandler {
	(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export default (func: asyncHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		func(req, res, next).catch(next);
	};
};
