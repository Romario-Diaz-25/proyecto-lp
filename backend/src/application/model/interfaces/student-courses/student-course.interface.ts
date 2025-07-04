import { Course } from "../../Course";
import { Student } from "../../Student";

export interface IStudentCourse {
  id?: number | undefined;
  course: Course;
  student: Student;
  startAt: Date;
}
