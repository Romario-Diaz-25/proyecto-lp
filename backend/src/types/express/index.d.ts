import * as express from "express";
import {
  Pagination,
  Sorting,
} from "../../domain/common/interfaces/db-response.interface";

declare global {
  namespace Express {
    interface Request {
      filters: any;
    }
  }
}
