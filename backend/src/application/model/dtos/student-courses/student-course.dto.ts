import { ICourse } from "../../interfaces/courses/course.interface";
import { IStudentCourseSchema } from "../../interfaces/student-courses/student-course-schema.interface";
import { IStudentCourse } from "../../interfaces/student-courses/student-course.interface";
import { IStudent } from "../../interfaces/students/student.interface";

export class StudentCourseDTO {
  // readonly id: number;
  // readonly course: ICourse;
  // readonly student: IStudent;
  // readonly startAt: Date;

  constructor(data: IStudentCourseSchema) {
    // this.id = data.id;
    // this.course = data.course;
    // this.student = data.student;
    // this.startAt = data.startAt;
  }
}
