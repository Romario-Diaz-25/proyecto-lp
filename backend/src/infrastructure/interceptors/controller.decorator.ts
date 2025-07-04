import { Request, Response } from "express";
import { AppDate } from "../lib/app-date";
import { AppQueryParams } from "../lib/app-query-params";
import { lang } from "../lib/lang";
import { getDurationInMilliseconds, getTrace } from "../utils/helpers";
import { TConstructor } from "./types/interceptor.type";
import { AppError } from "../lib/app-error";
import { env } from "process";
import { AppResponse } from "../lib/app-response";
import { HttpCode } from "../lib/http-status-codes";

export interface IControllerData<T> {
  body: T;
  params: Record<string, string | number>;
  query: Record<string, string | number>;
  headers: Record<string, string | number>;
  pagination: Record<string, string | number>;
  sorts: Array<Record<string, string | number>>;
  search: string;
  filters: Record<string, string | number>;
}

export function Controller<T extends TConstructor>(constructor: T) {
  for (const fn of Object.getOwnPropertyNames(constructor.prototype)) {
    const originalMethod = constructor.prototype[fn];
    if (typeof originalMethod === "function" && fn !== "constructor") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor.prototype[fn] = async function (...args: any) {
        const req = args[0] as Request;
        const res = args[1] as Response;

        if (this.eventBusRequest) {
          return originalMethod.call(this, req);
        }

        const trace = getTrace();
        Object.assign(req, { trace });

        lang.setDefaultLang();

        const start = process.hrtime();

        const now = new AppDate().toMYSQLDatetime();

        AppQueryParams.check(req);

        const result = await originalMethod.call(this, req, res);
        const end = new AppDate().toMYSQLDatetime();

        const timeLapse = {
          started: now,
          ended: end,
          duration: getDurationInMilliseconds(start),
        };

        if (result instanceof AppError) {
          const response = {
            success: false,
            kindMessage: result.message,
            stack: result.stack,
            httpCode: result.httpCode,
            timeLapse,
          };
          if (env.stage === "PROD") delete response.stack;
          res.status(result.httpCode).json(response);
        } else {
          const { httpCode } = result;
          delete result.httpCode;

          const response = !result.data ? { data: result } : result;

          const jsonResponse = {
            ...new AppResponse(req.method, response),
            timeLapse,
          };
          res.status(httpCode ?? HttpCode.OK).json(jsonResponse);
        }
      };
    }
  }
}
