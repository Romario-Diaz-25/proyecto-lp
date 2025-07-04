import { IStudentCourse } from "./student-course.interface";

export interface IStudentCourseParams
  extends Omit<IStudentCourse, "course" | "student"> {
  idCourse: number;
  idStudent: number;
}
