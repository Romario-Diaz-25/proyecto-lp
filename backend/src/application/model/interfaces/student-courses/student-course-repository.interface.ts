import { StudentCourse } from "../../StudentCourse";
import { IStudentCourseSchema } from "./student-course-schema.interface";

export interface IStudentCourseRepository {
  create(data: IStudentCourseSchema): Promise<{ insertedId: number }>;
  find(): Promise<StudentCourse[]>;
  findById(id: number): Promise<StudentCourse>;
  update(
    id: number,
    data: Partial<IStudentCourseSchema>
  ): Promise<{ modifiedCount: number }>;
  delete(id: number): Promise<{ deletedCount: number }>;
}
