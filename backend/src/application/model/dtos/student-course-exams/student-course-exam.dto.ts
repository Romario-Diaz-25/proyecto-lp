import { IExam } from "../../interfaces/exams/exam.interface";
import { IStudentCourseExam } from "../../interfaces/student-course-exams/student-course-exam.interface";
import { IStudentCourse } from "../../interfaces/student-courses/student-course.interface";

export class StudentCourseExamDTO {
  readonly id: number;
  readonly score: number;
  readonly studentCourse: IStudentCourse;
  readonly exam: IExam;

  constructor(data: IStudentCourseExam) {
    this.id = data.id;
    this.score = data.score;
    this.studentCourse = data.studentCourse;
    this.exam = data.exam;
  }
}
