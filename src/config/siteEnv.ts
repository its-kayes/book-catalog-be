import dotenv from 'dotenv';

type SiteEnvTypes = {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  SMTP_PASS: string;
  SMTP_USER: string;
  SMTP_PORT: number;
  SMTP_HOST: string;
  FRONTEND_BASE_URL: string;
  NODE_ENV: string;
};

dotenv.config();

const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  FRONTEND_BASE_URL,
  NODE_ENV
} = process.env as unknown as SiteEnvTypes;
export {
  FRONTEND_BASE_URL,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  MONGO_URI,
  NODE_ENV,
  PORT,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER
};
