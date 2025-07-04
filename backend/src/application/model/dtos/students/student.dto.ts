import { IStudent } from "../../interfaces/students/student.interface";

export class StudentDTO {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;

  constructor(data: IStudent) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = data.age;
  }
}
