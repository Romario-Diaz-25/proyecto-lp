import {
  Controller,
  IControllerData,
} from "../../infrastructure/interceptors/controller.decorator";
import { IRepositories } from "../model/common/repositories.interfaces";
import { ICourse } from "../model/interfaces/courses/course.interface";
import { CourseService } from "../services/course.service";

@Controller
export class CourseController {
  private courseService: CourseService;

  constructor(context: IRepositories) {
    this.courseService = new CourseService(context);
  }

  async find() {
    try {
      const result = await this.courseService.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findById({ params }: IControllerData<ICourse>) {
    try {
      const result = await this.courseService.findById(Number(params.id));
      return result;
    } catch (error) {
      return error;
    }
  }
  async create({ body }: IControllerData<ICourse>) {
    try {
      const result = await this.courseService.create(body);
      return result;
    } catch (error) {
      return error;
    }
  }
  async update({ body, params }: IControllerData<ICourse>) {
    try {
      const result = await this.courseService.update(Number(params.id), body);
      return result;
    } catch (error) {
      return error;
    }
  }
  async delete({ params }: IControllerData<ICourse>) {
    try {
      const result = await this.courseService.delete(Number(params.id));
      return result;
    } catch (error) {
      return error;
    }
  }
}
