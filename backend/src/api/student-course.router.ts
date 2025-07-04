import { Router } from "express";
import { StudentCourseController } from "../application/controllers/student-course.controller";
import { IRepositories } from "../application/model/common/repositories.interfaces";
import { RouterBase } from "./router-base";

export class StudentRouter extends RouterBase<StudentCourseController> {
  constructor(context: IRepositories) {
    super(StudentCourseController, context, "studentsCourse");
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
