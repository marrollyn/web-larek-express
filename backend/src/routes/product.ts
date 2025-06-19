import { Router } from 'express';
import { getProducts, postProduct } from '../controllers/products';
import validateProductBody from '../middlewares/validateProductBody';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', validateProductBody, postProduct);

export default productRouter;
