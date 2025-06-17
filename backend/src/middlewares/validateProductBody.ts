import { celebrate, Joi, Segments } from 'celebrate';

const validateProductBody = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(30).required(),
    category: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    price: Joi.number().min(0).allow(null).optional(),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
  }),
});

export default validateProductBody;
