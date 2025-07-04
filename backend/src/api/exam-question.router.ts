import { Router } from "express";

import { IRepositories } from "../application/model/common/repositories.interfaces";
import { RouterBase } from "./router-base";
import { ExamQuestionController } from "../application/controllers/exam-question.controller";

export class ExamQuestion extends RouterBase<ExamQuestionController> {
  constructor(context: IRepositories) {
    super(ExamQuestionController, context, "examQuestions");
  }

  routes(): void {
    this.router.route("/").get(this.controller.find.bind(this.controller));
    this.router
      .route("/:id")
      .get(this.controller.findById.bind(this.controller));

    this.router
      .route("/find-by-exam-id/:examId")
      .get(this.controller.findByExamId.bind(this.controller));
    this.router.route("/").post(this.controller.create.bind(this.controller));
    this.router.route("/:id").put(this.controller.update.bind(this.controller));
    this.router
      .route("/:id")
      .delete(this.controller.delete.bind(this.controller));
  }
}

export const router = (context: IRepositories): Router =>
  new ExamQuestion(context).router;
