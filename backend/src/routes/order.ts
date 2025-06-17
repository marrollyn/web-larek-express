import { Router } from 'express';
import postOrder from '../controllers/postOrder';
import validateOrderBody from '../middlewares/validateOrderBody';

const orderRouter = Router();

orderRouter.post('/', validateOrderBody, postOrder);

export default orderRouter;
