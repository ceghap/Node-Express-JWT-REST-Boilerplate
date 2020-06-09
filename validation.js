const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  // create a joi schema based on the object
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).email().required(),
    password: Joi.string().max(1024).min(6).required(),
    repeat_password: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .strict(),
  });

  // validate the incoming data
  return schema.validate(data);
};

const loginValidation = (data) => {
  // create a joi schema based on the object
  const schema = Joi.object({
    email: Joi.string().min(6).email().required(),
    password: Joi.string().min(6).required(),
  });

  // validate the incoming data
  return schema.validate(data);
};

// named export in nodejs
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
