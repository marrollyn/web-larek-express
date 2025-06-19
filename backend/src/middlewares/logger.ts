import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';

// middlewares/logger.ts
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: path.join(__dirname, '../logs/request.log') })],
  format: winston.format.json(),
});

// логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log') })],
  format: winston.format.json(),
});

// инфо логгер
const infoLogger = winston.createLogger({
  transports: [new winston.transports.File({ filename: path.join(__dirname, '../logs/info.log') })],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json(),
  ),
});

export { requestLogger, errorLogger, infoLogger };
