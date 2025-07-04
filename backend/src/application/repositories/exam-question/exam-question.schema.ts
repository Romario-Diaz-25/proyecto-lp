import { ISchema } from "../../../infrastructure/database/mysql/table-builder/interfaces/schema.interface";
import { IExamQuestionSchema } from "../../model/interfaces/exam-questions/exam-question-schema.interface";

export const ExamQuestionSchema: ISchema<IExamQuestionSchema>[] = [
  {
    columnName: "id",
    type: "increments",
    typeOptions: {
      primaryKey: true,
    },
  },
  {
    columnName: "questionText",
    type: "string",
  },
];
