import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { api } from "./infrastructure/api";
import { AppContext } from "./infrastructure/config/app-context";
import { IRepositories } from "./application/model/common/repositories.interfaces";
import {
  HttpCode,
  statusResponse,
} from "./infrastructure/lib/http-status-codes";

class Server {
  private api: Application;
  app: Application;

  constructor(private readonly context: IRepositories) {
    this.api = api(this.context);
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors({ origin: "*" }));
    this.app.use(morgan("dev"));

    this.app.use("/v1", this.api);

    this.app.use((_req: Request, res: Response) => {
      res.status(HttpCode.NOT_FOUND).json({
        success: false,
        kindMessage: statusResponse.NOT_FOUND,
      });
    });

    this.app.use(
      (err: any, req: Request, res: Response, _next: NextFunction) => {
        Object.defineProperty(err, "message", {
          enumerable: true,
        });

        res.json(err);
      }
    );
  }
}

export const server = new Server(new AppContext()).app;
