import { Course } from "./Course";
import { ICourseSchema } from "./interfaces/courses/course-schema.interface";
import { IStudentCourseSchema } from "./interfaces/student-courses/student-course-schema.interface";
import { IStudentCourse } from "./interfaces/student-courses/student-course.interface";
import { IStudentSchema } from "./interfaces/students/student-schema.interface";
import { Student } from "./Student";

export class StudentCourse {
  private constructor(
    private id: number | undefined,
    private course: Course,
    private student: Student,
    private startAt: Date
  ) {}

  static create(studentCourse: IStudentCourse): StudentCourse {
    const studentCreated = new StudentCourse(
      studentCourse.id,
      studentCourse.course,
      studentCourse.student,
      studentCourse.startAt
    );
    return studentCreated;
  }

  public toJSON(): IStudentCourse {
    return {
      id: this.id,
      course: this.course,
      student: this.student,
      startAt: this.startAt,
    };
  }
  public toSchema(): IStudentCourseSchema {
    return {
      id: this.id,
      idCourse: this.course.getId(),
      idStudent: this.student.getId(),
      start_at: this.startAt,
    };
  }

  public static fromSchema(schema: IStudentCourseSchema): StudentCourse {
    const studentCreated = new StudentCourse(
      schema.id,
      Course.fromSchema({
        id: schema.idCourse,
      } as ICourseSchema),
      Student.fromSchema({
        id: schema.idStudent,
      } as IStudentSchema),
      schema.start_at
    );
    return studentCreated;
  }
}
