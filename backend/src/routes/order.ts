import { Router } from 'express';
import postOrder from '../controllers/postOrder';

const orderRouter = Router();

orderRouter.post('/', postOrder);

export default orderRouter;
