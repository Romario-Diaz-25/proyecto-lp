import { IRepositories } from "../model/common/repositories.interfaces";
import { IStudentRepository } from "../model/interfaces/students/student-repository.interface";
import { IStudent } from "../model/interfaces/students/student.interface";
import { Student } from "../model/Student";

export class StudentService {
  private repository: IStudentRepository;
  constructor(context: IRepositories) {
    this.repository = context.studentRepository;
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

  async create(data: IStudent) {
    try {
      const student = Student.create(data);
      const result = await this.repository.create(student.toSchema());
      return result;
    } catch (error) {
      return error;
    }
  }
  async update(id: number, data: IStudent) {
    try {
      const student = Student.create(data);
      const result = await this.repository.update(id, student.toSchema());
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
