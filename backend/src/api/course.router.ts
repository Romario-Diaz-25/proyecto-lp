import { Router } from "express";

import { IRepositories } from "../application/model/common/repositories.interfaces";
import { RouterBase } from "./router-base";
import { CourseController } from "../application/controllers/course.controller";

export class StudentRouter extends RouterBase<CourseController> {
  constructor(context: IRepositories) {
    super(CourseController, context, "courses");
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
  new StudentRouter(context).router;
