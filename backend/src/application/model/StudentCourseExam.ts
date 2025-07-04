import { IExam } from "./interfaces/exams/exam.interface";
import { IStudentCourseExamSchema } from "./interfaces/student-course-exams/student-course-exam-schema.interface";
import { IStudentCourseExam } from "./interfaces/student-course-exams/student-course-exam.interface";
import { IStudentCourse } from "./interfaces/student-courses/student-course.interface";

export class StudentCourseExam {
  id: number | undefined;
  score: number;
  studentCourse: IStudentCourse;
  exam: IExam;

  constructor(data: IStudentCourseExam) {
    this.id = data.id;
    this.score = data.score;
    this.studentCourse = data.studentCourse;
    this.exam = data.exam;
  }

  public getId(): number | undefined {
    return this.id;
  }
  public getScore(): number {
    return this.score;
  }
  public getStudentCourse(): IStudentCourse {
    return this.studentCourse;
  }
  public getExam(): IExam {
    return this.exam;
  }
  public setId(id: number): void {
    this.id = id;
  }
  public setScore(score: number): void {
    this.score = score;
  }
  public setStudentCourse(studentCourse: IStudentCourse): void {
    this.studentCourse = studentCourse;
  }
  public setExam(exam: IExam): void {
    this.exam = exam;
  }
  public toJSON(): IStudentCourseExam {
    return {
      id: this.id!,
      score: this.score,
      studentCourse: this.studentCourse,
      exam: this.exam,
    };
  }
  public toSchema(): IStudentCourseExamSchema {
    return {
      id: this.id!,
      score: this.score,
      idStudentCourse: this.studentCourse.id!,
      idExam: this.exam.id,
    };
  }
  public static fromJSON(json: IStudentCourseExam): StudentCourseExam {
    return new StudentCourseExam(json);
  }
}
