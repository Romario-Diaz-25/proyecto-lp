import { IStudentSchema } from "./interfaces/students/student-schema.interface";
import { IStudent } from "./interfaces/students/student.interface";

export class Student {
  private constructor(
    private id: number,
    private firstName: string,
    private lastName: string,
    private age: number
  ) {}

  getId(): number {
    return this.id;
  }

  static create(student: IStudent): Student {
    const studentCreated = new Student(
      student.id,
      student.firstName,
      student.lastName,
      student.age
    );
    return studentCreated;
  }

  public toJSON(): IStudent {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
    };
  }
  public toSchema(): IStudentSchema {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
    };
  }

  public static fromSchema(schema: IStudentSchema): Student {
    return new Student(
      schema.id,
      schema.firstName,
      schema.lastName,
      schema.age
    );
  }
}
