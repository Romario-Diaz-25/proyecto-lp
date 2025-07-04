import { Exam } from "../../Exam";
import { IExamSchema } from "./exam-schema.interface";
import { IExam } from "./exam.interface";

export interface IExamRepository {
  create(data: IExamSchema): Promise<{ insertedId: number }>;
  find(): Promise<Exam[]>;
  findById(id: number): Promise<Exam>;
  update(
    id: number,
    data: Partial<IExamSchema>
  ): Promise<{ modifiedCount: number }>;
  delete(id: number): Promise<{ deletedCount: number }>;
}
