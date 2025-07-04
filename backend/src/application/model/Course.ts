import { ICourseSchema } from "./interfaces/courses/course-schema.interface";
import { ICourse } from "./interfaces/courses/course.interface";

export class Course {
  private constructor(
    private id: number,
    private code: string,
    private name: string,
    private description: string,
    private price: number,
    private createdAt: Date
  ) {}

  getId(): number {
    return this.id;
  }

  static create(course: ICourse): Course {
    const courseCreated = new Course(
      course.id,
      course.code,
      course.name,
      course.description,
      course.price,
      course.createdAt
    );
    return courseCreated;
  }

  public toJSON(): ICourse {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      description: this.description,
      price: this.price,
      createdAt: this.createdAt,
    };
  }
  public toSchema(): ICourseSchema {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      description: this.description,
      price: this.price,
      created_at: this.createdAt,
    };
  }

  public static fromSchema(schema: ICourseSchema): Course {
    return Course.create({
      id: schema.id,
      code: schema.code,
      name: schema.name,
      description: schema.description,
      price: schema.price,
      createdAt: schema.created_at,
    });
  }
}
