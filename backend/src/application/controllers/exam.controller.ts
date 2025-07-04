import {
  Controller,
  IControllerData,
} from "../../infrastructure/interceptors/controller.decorator";
import { IRepositories } from "../model/common/repositories.interfaces";
import { IExam } from "../model/interfaces/exams/exam.interface";
import { ExamService } from "../services/exam.service";

@Controller
export class ExamController {
  private examService: ExamService;

  constructor(context: IRepositories) {
    this.examService = new ExamService(context);
  }

  async find() {
    try {
      const result = await this.examService.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findById({ params }: IControllerData<IExam>) {
    try {
      const result = await this.examService.findById(Number(params.id));
      return result;
    } catch (error) {
      return error;
    }
  }
  async create({ body }: IControllerData<IExam>) {
    try {
      const result = await this.examService.create(body);
      return result;
    } catch (error) {
      return error;
    }
  }
  async update({ body, params }: IControllerData<IExam>) {
    try {
      const result = await this.examService.update(Number(params.id), body);
      return result;
    } catch (error) {
      return error;
    }
  }
  async delete({ params }: IControllerData<IExam>) {
    try {
      const result = await this.examService.delete(Number(params.id));
      return result;
    } catch (error) {
      return error;
    }
  }
}
