import { IStudentCourseExam } from "./student-course-exam.interface";

export interface IStudentCourseExamRepository {
  create(data: IStudentCourseExam): Promise<{ insertedId: number }>;
  find(): Promise<IStudentCourseExam[]>;
  findById(id: number): Promise<IStudentCourseExam>;
  findOne(params: Partial<IStudentCourseExam>): Promise<IStudentCourseExam>;
  update(
    id: number,
    data: Partial<IStudentCourseExam>
  ): Promise<{ modifiedCount: number }>;
  delete(id: number): Promise<{ deletedCount: number }>;
}
