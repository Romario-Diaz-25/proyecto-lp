import { ISchema } from "../../../infrastructure/database/mysql/table-builder/interfaces/schema.interface";
import { ICourseSchema } from "../../model/interfaces/courses/course-schema.interface";

export const CourseSchema: ISchema<ICourseSchema>[] = [
  {
    columnName: "id",
    type: "increments",
    typeOptions: {
      primaryKey: true,
    },
  },
  {
    columnName: "code",
    type: "string",
  },
  {
    columnName: "name",
    type: "string",
  },
  {
    columnName: "description",
    type: "text",
  },
  {
    columnName: "price",
    type: "decimal",
  },
  {
    columnName: "created_at",
    type: "timestamp",
  },
];
