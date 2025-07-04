import { IStudentCourse } from "./student-course.interface";

export interface IStudentCourseSchema
  extends Omit<IStudentCourse, "course" | "student" | "startAt"> {
  idCourse: number;
  idStudent: number;
  start_at: Date;
}
