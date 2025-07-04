import { IStudentSchema } from "./interfaces/students/student-schema.interface";
import { IStudent } from "./interfaces/students/student.interface";

export class Student {
  private constructor(
    private id: number,
    private firstName: string,
    private lastName: string,
    private age: number,
    private lifes: number = 3
  ) {}

  getId(): number {
    return this.id;
  }

  static create(student: IStudent): Student {
    const studentCreated = new Student(
      student.id,
      student.firstName,
      student.lastName,
      student.age,
      student.lifes || 3
    );
    return studentCreated;
  }

  public toJSON(): IStudent {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      lifes: this.lifes,
    };
  }
  public toSchema(): IStudentSchema {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
      lifes: this.lifes,
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
