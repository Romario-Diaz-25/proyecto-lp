import { Router } from "express";
import { RouterBase } from "./router-base";
import { StudentController } from "../application/controllers/students.controller";
import { IRepositories } from "../application/model/common/repositories.interfaces";

export class StudentRouter extends RouterBase<StudentController> {
  constructor(context: IRepositories) {
    super(StudentController, context, "students");
  }

  routes(): void {
    this.router.route("/").get(this.controller.find.bind(this.controller));
    this.router
      .route("/:id")
      .get(this.controller.findById.bind(this.controller));
    this.router.route("/").post(this.controller.create.bind(this.controller));
    this.router.route("/:id").put(this.controller.update.bind(this.controller));
    this.router
      .route("/decrement-lifes/:id")
      .put(this.controller.decrementLifes.bind(this.controller));
    this.router
      .route("/:id")
      .delete(this.controller.delete.bind(this.controller));
  }
}

export const router = (context: IRepositories): Router =>
  new StudentRouter(context).router;
