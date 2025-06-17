import { Router } from 'express';
import getProducts from '../controllers/getProducts';
import postProduct from '../controllers/postProduct';
import validateProductBody from '../middlewares/validateProductBody';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', validateProductBody, postProduct);

export default productRouter;
