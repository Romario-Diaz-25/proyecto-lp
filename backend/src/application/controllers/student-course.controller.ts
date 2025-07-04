import {
  Controller,
  IControllerData,
} from "../../infrastructure/interceptors/controller.decorator";
import { IRepositories } from "../model/common/repositories.interfaces";
import { IStudentCourseParams } from "../model/interfaces/student-courses/student-course-params.interface";
import { IStudentCourse } from "../model/interfaces/student-courses/student-course.interface";
import { StudentCourseService } from "../services/student-course.service";

@Controller
export class StudentCourseController {
  private studentCourseService: StudentCourseService;

  constructor(context: IRepositories) {
    this.studentCourseService = new StudentCourseService(context);
  }

  async find() {
    try {
      const result = await this.studentCourseService.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findById({ params }: IControllerData<IStudentCourse>) {
    try {
      const result = await this.studentCourseService.findById(
        Number(params.id)
      );
      return result;
    } catch (error) {
      return error;
    }
  }
  async create({ body }: IControllerData<IStudentCourseParams>) {
    try {
      const result = await this.studentCourseService.create(body);
      return result;
    } catch (error) {
      return error;
    }
  }
  async update({ body, params }: IControllerData<IStudentCourseParams>) {
    try {
      const result = await this.studentCourseService.update(
        Number(params.id),
        body
      );
      return result;
    } catch (error) {
      return error;
    }
  }
  async delete({ params }: IControllerData<IStudentCourse>) {
    try {
      const result = await this.studentCourseService.delete(Number(params.id));
      return result;
    } catch (error) {
      return error;
    }
  }
}
