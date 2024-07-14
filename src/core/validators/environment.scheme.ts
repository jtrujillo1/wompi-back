import * as Joi from 'joi';

export const EnvironmentSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  // NUMBER_TEMPLATE: Joi.string().required(),
  // ALEGRA_SERVICE_IP: Joi.string().required(),
  // ALEGRA_TOKEN: Joi.string().required(),
  // SECURITY_SERVICE_IP: Joi.string().required(),
  WOMPI_SERVICE_IP: Joi.string().required(),
  API_KEY_PUBLIC_WOMPI: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  // AWS_USER_POOL_REGION: Joi.string().required(),
  // AWS_USER_POOL_ID: Joi.string().required(),
  // AWS_CLIENT_ID: Joi.string().required(),
  // AWS_CLIENT_ID_RELATIVE: Joi.string().required(),
  API_KEY_PRIVATE_WOMPI: Joi.string().required(),
  API_KEY_INTEGRITY_WOMPI: Joi.string().required(),
}).options({
  allowUnknown: true,
  abortEarly: false,
});
