import { Student } from "../../Student";
import { IStudentSchema } from "./student-schema.interface";

export interface IStudentRepository {
  create(data: IStudentSchema): Promise<{ insertedId: number }>;
  find(): Promise<Student[]>;
  findById(id: number): Promise<Student>;
  update(
    id: number,
    data: Partial<IStudentSchema>
  ): Promise<{ modifiedCount: number }>;
  delete(id: number): Promise<{ deletedCount: number }>;
}
