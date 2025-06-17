import { Response, Request, NextFunction } from 'express';
import product from '../models/product';

export default function getProducts(_req: Request, res: Response, next: NextFunction) {
  product.find({})
    .then((products) => res.send({ items: products, total: products.length }))
    .catch(next);
}
