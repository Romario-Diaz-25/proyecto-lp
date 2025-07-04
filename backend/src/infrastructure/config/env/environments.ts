import dotenv from "dotenv";
import { IEnvironments } from "./interfaces/environments.interface";
dotenv.config();

export const env: IEnvironments = {
  stage: String(process.env.STAGE),
  app: {
    name: String(process.env.APP_NAME),
    port: Number(process.env.APP_PORT),
  },
  db: {
    mysql: {
      port: process.env.DB_MYSQL_PORT,
      host: process.env.DB_MYSQL_HOST ?? "localhost",
      user: process.env.DB_MYSQL_USER ?? "root",
      pass: process.env.DB_MYSQL_PASS ?? "",
      name: process.env.DB_MYSQL_NAME ?? "root",
      time: process.env.DB_MYSQL_TIME ?? "",
      dialect: process.env.DB_MYSQL_DIALECT ?? "",
      pool: {
        min: Number(process.env.DB_MYSQL_POOL_MIN) || 0,
        max: Number(process.env.DB_MYSQL_POOL_MAX) || 10,
      },
    },
  },
};
