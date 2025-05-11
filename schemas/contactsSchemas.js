import Joi from 'joi';

const requiredFields = ['name', 'email', 'phone'];

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .or(...requiredFields)
  .messages({
    'object.missing': 'Body must have at least one field',
    'any.required': 'Body must have at least one field',
    'object.or': 'Body must have at least one field',
  });

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
