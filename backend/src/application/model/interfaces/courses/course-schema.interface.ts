import { ICourse } from "./course.interface";

export interface ICourseSchema extends Omit<ICourse, "createdAt"> {
  created_at: Date;
}
