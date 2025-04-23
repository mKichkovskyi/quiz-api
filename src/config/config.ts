import Joi from "joi";
import "dotenv/config";

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("development", "test").required(),
    DB_DATABASE: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    // test
    TEST_DB_USERNAME: Joi.string().required(),
    TEST_DB_PASSWORD: Joi.string().required(),
    TEST_DB_DATABASE: Joi.string().required(),
    TEST_DB_HOST: Joi.string().required(),
    TEST_DB_PORT: Joi.number().required(),
  })
  .unknown();

const { value: result, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Env validation error: ${error.message}`);
}

const config = {
  development: {
    env: result.NODE_ENV,
    DB_DATABASE: result.DB_DATABASE,
    DB_USERNAME: result.DB_USERNAME,
    DB_PASSWORD: result.DB_PASSWORD,
    DB_HOST: result.DB_HOST,
    DB_PORT: result.DB_PORT,
  },
  test: {
    env: result.NODE_ENV,
    DB_DATABASE: result.TEST_DB_DATABASE,
    DB_USERNAME: result.TEST_DB_USERNAME,
    DB_PASSWORD: result.TEST_DB_PASSWORD,
    DB_HOST: result.TEST_DB_HOST,
    DB_PORT: result.TEST_DB_PORT,
  },
};

const env: "development" | "test" = result.NODE_ENV;

export default config[env];
