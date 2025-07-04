import { ISchema } from "../../../infrastructure/database/mysql/table-builder/interfaces/schema.interface";
import { IStudentCourseSchema } from "../../model/interfaces/student-courses/student-course-schema.interface";

export const StudentCourseSchema: ISchema<IStudentCourseSchema>[] = [
  {
    columnName: "id",
    type: "increments",
    typeOptions: {
      primaryKey: true,
    },
  },
  {
    columnName: "idCourse",
    type: "integer",
  },
  {
    columnName: "idStudent",
    type: "integer",
  },

  {
    columnName: "start_at",
    type: "datetime",
  },
];
