import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import writingDB from './utils/writeDB/writingDB';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middlewares/err-handler';
import { requestLogger, errorLogger, infoLogger } from './middlewares/logger';

dotenv.config();
const PORT = Number(process.env.PORT);
const DB_ADDRESS = String(process.env.DB_ADDRESS);

async function startApp() {
  try {
    // 1) подключаемся к БД
    await mongoose.connect(DB_ADDRESS);
    infoLogger.info('DB ok');

    // 2) записываем данные
    await writingDB();
    infoLogger.info('data ok');

    // 3) express
    const app = express();
    app.use(requestLogger);
    app.use(cors({
      origin: 'http://localhost:5173',
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

    // 4) Роуты без авторизации
    app.use('/product', productRouter);
    app.use('/order', orderRouter);

    // // 5) middleware авторизации
    // app.use(...);

    // // 6) Защищённые роуты

    // // 7) 404
    app.use((_req, res) => {
      res.status(404).json({ message: 'Not Found' });
    });

    // // 8) logger, errorHandler
    app.use(errorLogger);
    app.use(errors());
    app.use(errorHandler);

    // 9) запуск сервера
    app.listen(PORT, () => {
      infoLogger.info(`App listening on port ${PORT}`);
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    infoLogger.error(`ошибка запуска сервера: ${msg}`);
    process.exit(1);
  }
}

startApp();
