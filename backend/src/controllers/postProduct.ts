import { Response, Request, NextFunction } from 'express';
import product from '../models/product';

export default async function postProduct(req: Request, res: Response, next: NextFunction) {
  const newProduct = req.body;

  try {
    const productCheck = await product.findOne({ title: newProduct.title });
    if (productCheck) {
      return res
        .status(409)
        .json({ message: 'товар с таким title уже есть в БД' });
    }
    const createdProduct = await product.create(newProduct);
    return res.status(201).json(createdProduct);
  } catch (err) {
    return next(err);
  }
}
