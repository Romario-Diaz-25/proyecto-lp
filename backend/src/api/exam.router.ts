import { Router } from "express";

import { IRepositories } from "../application/model/common/repositories.interfaces";
import { RouterBase } from "./router-base";
import { ExamController } from "../application/controllers/exam.controller";

export class ExamRouter extends RouterBase<ExamController> {
  constructor(context: IRepositories) {
    super(ExamController, context, "exams");
  }

  routes(): void {
    this.router.route("/").get(this.controller.find.bind(this.controller));
    this.router
      .route("/:id")
      .get(this.controller.findById.bind(this.controller));
    this.router.route("/").post(this.controller.create.bind(this.controller));
    this.router.route("/:id").put(this.controller.update.bind(this.controller));
    this.router
      .route("/:id")
      .delete(this.controller.delete.bind(this.controller));
  }
}

export const router = (context: IRepositories): Router =>
  new ExamRouter(context).router;
