import { Response, Request, NextFunction } from 'express';
import product from '../models/product';
import ConflictError from '../errors/conflict-err';

export function getProducts(_req: Request, res: Response, next: NextFunction) {
  product.find({})
    .then((products) => res.send({ items: products, total: products.length }))
    .catch(next);
}

export async function postProduct(req: Request, res: Response, next: NextFunction) {
  const newProduct = req.body;

  try {
    const productCheck = await product.findOne({ title: newProduct.title });
    if (productCheck) {
      return next(new ConflictError('товар с таким title уже есть в БД'));
    }
    const createdProduct = await product.create(newProduct);
    return res.status(201).json(createdProduct);
  } catch (err) {
    return next(err);
  }
}
