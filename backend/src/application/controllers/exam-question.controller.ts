import {
  Controller,
  IControllerData,
} from "../../infrastructure/interceptors/controller.decorator";
import { IRepositories } from "../model/common/repositories.interfaces";
import { IExamQuestion } from "../model/interfaces/exam-questions/exam-question.interface";
import { ExamQuestionService } from "../services/exam-question.service";

@Controller
export class ExamQuestionController {
  private examQuestionService: ExamQuestionService;

  constructor(context: IRepositories) {
    this.examQuestionService = new ExamQuestionService(context);
  }

  async find() {
    try {
      const result = await this.examQuestionService.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findById({ params }: IControllerData<IExamQuestion>) {
    try {
      const result = await this.examQuestionService.findById(Number(params.id));
      return result;
    } catch (error) {
      return error;
    }
  }

  async findByExamId({ params }: IControllerData<IExamQuestion>) {
    try {
      const result = await this.examQuestionService.findByExamId(
        Number(params.examId)
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async create({ body }: IControllerData<IExamQuestion>) {
    try {
      const result = await this.examQuestionService.create(body);
      return result;
    } catch (error) {
      return error;
    }
  }
  async update({ body, params }: IControllerData<IExamQuestion>) {
    try {
      const result = await this.examQuestionService.update(
        Number(params.id),
        body
      );
      return result;
    } catch (error) {
      return error;
    }
  }
  async delete({ params }: IControllerData<IExamQuestion>) {
    try {
      const result = await this.examQuestionService.delete(Number(params.id));
      return result;
    } catch (error) {
      return error;
    }
  }
}
