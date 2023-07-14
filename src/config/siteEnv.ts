import dotenv from 'dotenv';

type SiteEnvTypes = {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  FRONTEND_BASE_URL: string;
  NODE_ENV: string;
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;
};

dotenv.config();

const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  FRONTEND_BASE_URL,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  NODE_ENV
} = process.env as unknown as SiteEnvTypes;
export {
  FRONTEND_BASE_URL,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  MONGO_URI,
  NODE_ENV,
  PORT,
  JWT_ACCESS_TOKEN_EXPIRES_IN
};
