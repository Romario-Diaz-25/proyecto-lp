import express, { Application, Request, Response, NextFunction } from "express";
import { env } from "./config/env/environments";
import { routes } from "./config/routes";
import { IRepositories } from "../application/model/common/repositories.interfaces";
import { HttpCode, statusResponse } from "./lib/http-status-codes";

class API {
  api: Application;

  constructor(readonly context: IRepositories) {
    this.api = express();
    this.api.use(routes(context));

    this.api.use(
      "/health",
      (_req: Request, _res: Response, next: NextFunction) =>
        next({ message: "ok", success: true })
    );

    this.api.use("**", (_req: Request, res: Response) => {
      res.status(HttpCode.NOT_FOUND).json({
        kindMessage: statusResponse.NOT_FOUND,
        success: false,
      });
    });

    this.api.use(
      (err: any, _req: Request, _res: Response, next: NextFunction) => {
        if (env.stage === "PROD") delete err.stack;
        next(err);
      }
    );
  }
}

export const api = (context: IRepositories): Application =>
  new API(context).api;
