const Joi = require('joi');

const taskSchemaPost = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).required(),
  isCompleted: Joi.boolean().default(false),
});

const taskSchemaPut = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(5),
  isCompleted: Joi.boolean(),
});

module.exports = (req, res, next) => {
  const schema = req.method === "POST" ? taskSchemaPost : taskSchemaPut;
  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  req.body = value;
  next();
};
