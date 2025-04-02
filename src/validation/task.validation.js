const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  status: Joi.string().valid("pending", "in-progress", "completed").required(),
});


const updateTaskSchema = Joi.object()
  .keys({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
    status: Joi.string().valid("pending", "in-progress", "completed").optional(),
  })
  .min(1);

module.exports = { updateTaskSchema };


module.exports = { createTaskSchema, updateTaskSchema };
