import { IRepositories } from "../model/common/repositories.interfaces";
import {
  Controller,
  IControllerData,
} from "../../infrastructure/interceptors/controller.decorator";
import { StudentService } from "../services/students.service";
import { IStudent } from "../model/interfaces/students/student.interface";

@Controller
export class StudentController {
  private studentService: StudentService;

  constructor(context: IRepositories) {
    this.studentService = new StudentService(context);
  }

  async decrementLifes({ params }: IControllerData<IStudent>) {
    try {
      const result = await this.studentService.decrementLifes(
        Number(params.id)
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async find() {
    try {
      const result = await this.studentService.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findById({ params }: IControllerData<IStudent>) {
    try {
      const result = await this.studentService.findById(Number(params.id));
      return result;
    } catch (error) {
      return error;
    }
  }
  async create({ body }: IControllerData<IStudent>) {
    try {
      const result = await this.studentService.create(body);
      return result;
    } catch (error) {
      return error;
    }
  }
  async update({ body, params }: IControllerData<IStudent>) {
    try {
      const result = await this.studentService.update(Number(params.id), body);
      return result;
    } catch (error) {
      return error;
    }
  }
  async delete({ params }: IControllerData<IStudent>) {
    try {
      const result = await this.studentService.delete(Number(params.id));
      return result;
    } catch (error) {
      return error;
    }
  }
}
