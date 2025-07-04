import { Course } from "../../Course";
import { ICourseSchema } from "./course-schema.interface";

export interface ICourseRepository {
  create(data: ICourseSchema): Promise<{ insertedId: number }>;
  find(): Promise<Course[]>;
  findById(id: number): Promise<Course>;
  update(
    id: number,
    data: Partial<ICourseSchema>
  ): Promise<{ modifiedCount: number }>;
  delete(id: number): Promise<{ deletedCount: number }>;
}
