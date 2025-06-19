import { NextFunction, Request, Response } from 'express';
import { isCelebrateError, CelebrateError } from 'celebrate';
import mongoose from 'mongoose';

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // celebrate
  if (isCelebrateError(err)) {
    const error = (err as CelebrateError).details.get('body');
    const message = error?.message || 'Validation failed';
    return res.status(400).json({ message });
  }
  // Joi-ошибки
  if (err.isJoi) {
    const messages = err.details.map((d: any) => d.message).join('; ');
    return res.status(400).json({ message: messages });
  }

  // mogoose schema
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  // Mongo
  if (err instanceof Error && err.message.includes('E11000')) {
    return res.status(409).json({ message: 'такой товар уже существует' });
  }

  // кастомные ошибки и 500
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ message: err.message || 'Ошибка сервера' });
}
