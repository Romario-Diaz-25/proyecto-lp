import { Router } from "express";
import { IRepositories } from "../application/model/common/repositories.interfaces";
type TConstructor<T> = { new (context: IRepositories): T };

export class RouterBase<T> {
  public router: Router;
  protected controller: T;
  protected entityIdentificator: string;
  constructor(
    TController: TConstructor<T>,
    context: IRepositories,
    entityIdentificator: string
  ) {
    this.router = Router();
    this.controller = new TController(context);
    this.entityIdentificator = entityIdentificator;

    this.routes();
  }

  routes(): void {}
}
