import { Request } from "express";

export class AppQueryParams {
  static check(req: Request) {
    this.applyFilters(req);
  }

  static applyFilters(req: Request) {
    const query = { ...req.query };
    delete query.page;
    delete query.sort;
    delete query.search;
    delete query.size;
    delete query.sortBy;

    req.filters = query;
  }
}
