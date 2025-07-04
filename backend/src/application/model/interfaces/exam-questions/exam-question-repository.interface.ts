import { ExamQuestion } from "../../ExamQuestion";
import { IExamQuestionSchema } from "./exam-question-schema.interface";

export interface IExamQuestionRepository {
  create(data: IExamQuestionSchema): Promise<{ insertedId: number }>;
  find(): Promise<ExamQuestion[]>;
  findByExamId(examId: number): Promise<ExamQuestion[]>;
  findById(id: number): Promise<ExamQuestion>;
  update(
    id: number,
    data: Partial<IExamQuestionSchema>
  ): Promise<{ modifiedCount: number }>;
  delete(id: number): Promise<{ deletedCount: number }>;
}
