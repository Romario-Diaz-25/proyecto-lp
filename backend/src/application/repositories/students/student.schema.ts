import { ISchema } from "../../../infrastructure/database/mysql/table-builder/interfaces/schema.interface";
import { IStudentSchema } from "../../model/interfaces/students/student-schema.interface";

export const StudentSchema: ISchema<IStudentSchema>[] = [
  {
    columnName: "id",
    type: "increments",
    typeOptions: {
      primaryKey: true,
    },
  },
  {
    columnName: "firstName",
    type: "string",
  },
  {
    columnName: "lastName",
    type: "string",
  },
  {
    columnName: "age",
    type: "integer",
  },
];
