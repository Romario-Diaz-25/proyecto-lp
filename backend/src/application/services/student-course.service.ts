import { IRepositories } from "../model/common/repositories.interfaces";
import { Course } from "../model/Course";
import { ICourse } from "../model/interfaces/courses/course.interface";
import { IStudentCourseParams } from "../model/interfaces/student-courses/student-course-params.interface";
import { IStudentCourseRepository } from "../model/interfaces/student-courses/student-course-repository.interface";
import { IStudentCourse } from "../model/interfaces/student-courses/student-course.interface";
import { IStudent } from "../model/interfaces/students/student.interface";
import { Student } from "../model/Student";
import { StudentCourse } from "../model/StudentCourse";

export class StudentCourseService {
  private repository: IStudentCourseRepository;
  constructor(context: IRepositories) {
    this.repository = context.studentCourseRepository;
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

  async create(data: IStudentCourseParams) {
    try {
      const course = Course.create({ id: data.idCourse } as ICourse);
      const student = Student.create({ id: data.idStudent } as IStudent);
      const studentCourse = StudentCourse.create({
        course,
        student,
        startAt: data.startAt,
      });
      const result = await this.repository.create(studentCourse.toSchema());
      return result;
    } catch (error) {
      return error;
    }
  }
  async update(id: number, data: IStudentCourseParams) {
    try {
      const course = Course.create({ id: data.idCourse } as ICourse);
      const student = Student.create({ id: data.idStudent } as IStudent);
      const studentCourse = StudentCourse.create({
        course,
        student,
        startAt: data.startAt,
      });
      const result = await this.repository.update(id, studentCourse.toSchema());
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
