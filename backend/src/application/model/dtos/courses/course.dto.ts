import { ICourseSchema } from "../../interfaces/courses/course-schema.interface";
import { ICourse } from "../../interfaces/courses/course.interface";

export class CourseDTO {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly createdAt: Date;

  constructor(data: ICourseSchema) {
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.createdAt = data.created_at;
  }
}
