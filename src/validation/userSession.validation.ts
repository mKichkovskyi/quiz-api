import Joi from "joi";

const createUserSession = {
  query: Joi.object({}),
  body: Joi.object({}),
  params: Joi.object({}),
};

export { createUserSession };
