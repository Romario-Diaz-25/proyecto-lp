import { IRepositories } from "../model/common/repositories.interfaces";
import { Exam } from "../model/Exam";
import { IExamRepository } from "../model/interfaces/exams/exam-repository.interface";
import { IExam } from "../model/interfaces/exams/exam.interface";

export class ExamService {
  private repository: IExamRepository;
  constructor(context: IRepositories) {
    this.repository = context.examRepository;
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

  async create(data: IExam) {
    try {
      const exam = Exam.create(data);
      const result = await this.repository.create(exam.toSchema());
      return result;
    } catch (error) {
      return error;
    }
  }
  async update(id: number, data: IExam) {
    try {
      const exam = Exam.create(data);
      const result = await this.repository.update(id, exam.toSchema());
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
