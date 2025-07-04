import { IExam } from "../exams/exam.interface";
import { IStudentCourse } from "../student-courses/student-course.interface";

export interface IStudentCourseExam {
  id: number;
  score: number;
  studentCourse: IStudentCourse;
  exam: IExam;
}
