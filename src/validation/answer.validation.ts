import Joi from "joi";

const createAnswer = {
  query: Joi.object({}),
  body: Joi.object({
    questionId: Joi.string()
      .guid({
        version: ["uuidv4"],
      })
      .required(),
    userSessionId: Joi.string()
      .guid({
        version: ["uuidv4"],
      })
      .required(),
    answer: Joi.array().items(Joi.string()),
  }),
  params: Joi.object({}),
};

const getAnswers = {
  query: Joi.object({
    userSessionId: Joi.string().guid({
      version: ["uuidv4"],
    }),
  }),
  params: Joi.object({}),
  body: Joi.object({}),
};

export { createAnswer, getAnswers };
