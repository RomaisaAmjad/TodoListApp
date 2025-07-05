const Joi = require('joi');

const taskSchemaPost = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).required(),
  isCompleted: Joi.boolean().default(false),
  userId: Joi.number().integer().required()
});

const taskSchemaPut = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(5),
  isCompleted: Joi.boolean(),
  userId: Joi.string().optional(),
});


const validateTaskPost = (data) => taskSchemaPost.validate(data);
const validateTaskPut = (data) => taskSchemaPut.validate(data);

module.exports = { validateTaskPost, validateTaskPut };