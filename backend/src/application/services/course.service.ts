import { IRepositories } from "../model/common/repositories.interfaces";
import { Course } from "../model/Course";
import { ICourseRepository } from "../model/interfaces/courses/course-repository.interface";
import { ICourse } from "../model/interfaces/courses/course.interface";

export class CourseService {
  private repository: ICourseRepository;
  constructor(context: IRepositories) {
    this.repository = context.courseRepository;
  }

  async find() {
    try {
      const result = await this.repository.find();
      return result;
    } catch (error) {
      return error;
    }
  }

  async findById(id: number) {
    try {
      const result = await this.repository.findById(id);
      return result;
    } catch (error) {
      return error;
    }
  }

  async create(data: ICourse) {
    try {
      const course = Course.create(data);
      const result = await this.repository.create(course.toSchema());
      return result;
    } catch (error) {
      return error;
    }
  }
  async update(id: number, data: ICourse) {
    try {
      const course = Course.create(data);
      const result = await this.repository.update(id, course.toSchema());
      return result;
    } catch (error) {
      return error;
    }
  }
  async delete(id: number) {
    try {
      const result = await this.repository.delete(id);
      return result;
    } catch (error) {
      return error;
    }
  }
}
