import { IStudentCourseExam } from "./student-course-exam.interface";

export interface IStudentCourseExamSchema
  extends Omit<IStudentCourseExam, "studentCourse" | "exam"> {
  idStudentCourse: number | number;
  idExam: number;
}
