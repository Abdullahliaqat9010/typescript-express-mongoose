import { EnvironmentInterface } from "interfaces";
import dotenv from "dotenv";
dotenv.config();

const env: any = process.env;

export const Environment: EnvironmentInterface = {
  NODE_ENV: env.NODE_ENV,
  PORT: env.PORT,
  MONGO_URI: env.MONGO_URI,
  GOOGLE_MAPS_API_KEY: env.GOOGLE_MAPS_API_KEY,
  ADMIN_EMAIL: env.ADMIN_EMAIL,
  ADMIN_PASSWORD: env.ADMIN_PASSWORD,
};
