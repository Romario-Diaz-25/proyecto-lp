import { ISchema } from "../../../infrastructure/database/mysql/table-builder/interfaces/schema.interface";
import { IExamSchema } from "../../model/interfaces/exams/exam-schema.interface";

export const ExamSchema: ISchema<IExamSchema>[] = [
  {
    columnName: "id",
    type: "increments",
    typeOptions: {
      primaryKey: true,
    },
  },
  {
    columnName: "title",
    type: "string",
  },
  {
    columnName: "description",
    type: "string",
  },
  {
    columnName: "maxScore",
    type: "integer",
  },
  {
    columnName: "minimumScoreToApprove",
    type: "integer",
  },
  {
    columnName: "icon",
    type: "string",
  },
];
