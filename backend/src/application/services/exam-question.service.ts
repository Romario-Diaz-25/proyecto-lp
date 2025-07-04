import { IRepositories } from "../model/common/repositories.interfaces";
import { ExamQuestion } from "../model/ExamQuestion";
import { IExamQuestionRepository } from "../model/interfaces/exam-questions/exam-question-repository.interface";
import { IExamQuestion } from "../model/interfaces/exam-questions/exam-question.interface";

export class ExamQuestionService {
  private repository: IExamQuestionRepository;
  constructor(context: IRepositories) {
    this.repository = context.examQuestionRepository;
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

  async findByExamId(examId: number) {
    try {
      const result = await this.repository.findByExamId(examId);
      return result;
    } catch (error) {
      return error;
    }
  }

  async create(data: IExamQuestion) {
    try {
      const examQuestion = ExamQuestion.create(data);
      const result = await this.repository.create(examQuestion.toSchema());
      return result;
    } catch (error) {
      return error;
    }
  }
  async update(id: number, data: IExamQuestion) {
    try {
      const examQuestion = ExamQuestion.create(data);
      const result = await this.repository.update(id, examQuestion.toSchema());
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
