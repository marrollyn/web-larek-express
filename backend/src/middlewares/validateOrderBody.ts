import { celebrate, Joi, Segments } from 'celebrate';

const validateOrderBody = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string()
      .email()
      .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .messages({
        'string.pattern.base': 'поле email должно быть валидным адресом',
        'string.empty': 'поле email не может быть пустым',
        'any.required': 'поле email обязательно',
      })
      .required(),
    phone: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    total: Joi.number().min(1).required(),
    items: Joi.array()
      .items(
        Joi.string()
          .hex()
          .length(24)
          .message('ID товара должен быть 24-символьной hex-строкой')
          .required(),
      )
      .min(1)
      .required(),
  }).unknown(false),
});

export default validateOrderBody;
