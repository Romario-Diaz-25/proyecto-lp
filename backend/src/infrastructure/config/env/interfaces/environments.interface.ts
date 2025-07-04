import { IEnvApp } from "./env-application.interface";
import { IEnvDB } from "./env-database.interface";

export interface IEnvironments {
  app: IEnvApp;
  stage: string;
  db: IEnvDB;
}
