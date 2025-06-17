import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/bad-req-err';
import NotFoundError from '../errors/not-found-err';
import ConflictError from '../errors/conflict-err';

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // Joi-ошибки
  if (err.isJoi) {
    const messages = err.details.map((d: any) => d.message).join('; ');
    return res.status(400).json({ message: messages });
  }
  // кастомные ошибки
  if (err instanceof BadRequestError
   || err instanceof NotFoundError
   || err instanceof ConflictError
  ) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Mongo
  if (err instanceof Error && err.message.includes('E11000')) {
    return res.status(409).json({ message: 'такой товар уже существует' });
  }

  // 500
  return res.status(500).json({ message: 'на сервере произошла ошибка' });
}
