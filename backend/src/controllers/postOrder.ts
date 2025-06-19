import { Response, Request, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import product from '../models/product';
import BadRequestError from '../errors/bad-req-err';

export type TPayment = 'card' | 'online';

export interface IOrderReq {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface IOrderRes {
    id: string;
    total: number
}

export default async function postOrder(
  req: Request <{}, IOrderRes, IOrderReq>,
  res: Response,
  next: NextFunction,
) {
  try {
    const value = req.body;

    const products = await product.find({ _id: { $in: value.items } });
    if (products.length !== value.items.length) {
      return next(new BadRequestError('Ошибка валидации, некоторые ID товаров не найдены'));
    }

    const notPriced = products.filter((item) => item.price == null);
    if (notPriced.length) {
      return next(new BadRequestError('Ошибка валидации, некоторые товары не продаются'));
    }

    const sum = products.reduce((acc, item) => acc + (item.price!), 0);
    if (sum !== value.total) {
      return next(new BadRequestError(`Ошибка валидации, сумма цен товаров (${sum}) не соответствует total`));
    }

    const orderId = faker.string.uuid();
    return res.status(200).json({ id: orderId, total: value.total });
  } catch (err) {
    return next(err);
  }
}
