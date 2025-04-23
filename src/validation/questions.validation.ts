import Joi from "joi";

const getQuestions = {
  query: Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
  }),
  body: Joi.object({}),
  params: Joi.object({}),
};

export { getQuestions };
