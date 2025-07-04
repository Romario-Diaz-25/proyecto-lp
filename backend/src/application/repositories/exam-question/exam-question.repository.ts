import { IDatabase } from "../../../infrastructure/database/mysql/mysql";
import { ISchema } from "../../../infrastructure/database/mysql/table-builder/interfaces/schema.interface";
import { AppDate } from "../../../infrastructure/lib/app-date";
import { errorHandler } from "../../../infrastructure/lib/error-handler";
import {
  notFoundError,
  notModifiedError,
} from "../../../infrastructure/lib/handler-error";
import { lang } from "../../../infrastructure/lib/lang";
import { ExamQuestion } from "../../model/ExamQuestion";
import { IExamQuestionRepository } from "../../model/interfaces/exam-questions/exam-question-repository.interface";
import { IExamQuestionSchema } from "../../model/interfaces/exam-questions/exam-question-schema.interface";
import { IExamQuestion } from "../../model/interfaces/exam-questions/exam-question.interface";
import { ExamQuestionSchema } from "./exam-question.schema";

export class ExamQuestionRepository implements IExamQuestionRepository {
  tableName = "ExamQuestions";
  selectableProps: string[] = [];
  db: IDatabase;
  private tableSchema: ISchema<IExamQuestionSchema>[];
  constructor(readonly mysql: IDatabase) {
    this.db = mysql;
    this.tableSchema = ExamQuestionSchema;
    this.buildSelectableProps();
  }

  buildSelectableProps() {
    for (const column of this.tableSchema) {
      this.selectableProps.push(
        `${this.tableName}.${String(column.columnName)}`
      );
    }
  }

  async create(data: IExamQuestionSchema): Promise<{ insertedId: number }> {
    try {
      const [insertedId] = await this.db.from(this.tableName).insert(data);

      if (!insertedId)
        throw notModifiedError(
          lang.__("common.error.notModified", {
            value: this.tableName,
          })
        );

      return { insertedId };
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async find(filters?: Partial<IExamQuestionSchema>): Promise<ExamQuestion[]> {
    try {
      const query = this.db
        .select(this.selectableProps)
        .from(this.tableName)
        .whereNull("deleted_at")
        .where({ ...filters });

      const result = await query;

      return result.map((res) => ExamQuestion.create(res));
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async findByExamId(examId: number): Promise<ExamQuestion[]> {
    try {
      const query = await this.db.raw(
        `
          SELECT
            q.id,
            q.questionText,
            q.examId,
            CONCAT(
              '[', 
              GROUP_CONCAT(JSON_QUOTE(a.response) ORDER BY a.id SEPARATOR ','), 
              ']'
            ) AS answerOptions,
            (
              SELECT COUNT(*)
              FROM ExamAnswers AS a2
              WHERE a2.examQuestionId = q.id
                AND a2.id < (
                  SELECT a3.id
                  FROM ExamAnswers AS a3
                  WHERE a3.examQuestionId = q.id
                    AND a3.isCorrect = TRUE
                  LIMIT 1
                )
            ) AS correctAnswerIndex
          FROM ExamQuestions AS q
          JOIN ExamAnswers   AS a ON a.examQuestionId = q.id
          WHERE q.examId = ?
          GROUP BY q.id, q.questionText;
          `,
        [examId]
      );

      const result = query[0].map((q: IExamQuestion) => ({
        ...q,
        answerOptions: JSON.parse((q.answerOptions as string) || ""),
      }));

      return result.map((res: any) => ExamQuestion.create(res));
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async findById(id: number): Promise<ExamQuestion> {
    try {
      const query = await this.db
        .select(this.selectableProps)
        .from(this.tableName)
        .where({ id })
        .whereNull("deleted_at")
        .first();

      if (!query)
        throw notFoundError(
          lang.__("common.error.notFound", { value: this.tableName })
        );

      return ExamQuestion.create(query);
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async update(
    id: number,
    data: Partial<IExamQuestionSchema>
  ): Promise<{ modifiedCount: number }> {
    try {
      const updateResult = await this.db
        .from(this.tableName)
        .update(data)
        .where({ id });

      if (!updateResult)
        throw notModifiedError(
          lang.__("common.error.notModified", { value: this.tableName })
        );

      return { modifiedCount: updateResult };
    } catch (error) {
      throw errorHandler(error);
    }
  }

  async delete(id: number): Promise<{ deletedCount: number }> {
    try {
      const deleteResult = await this.db
        .from(this.tableName)
        .update({ deleted_at: new AppDate().toMYSQLDatetime() })
        .where({ id });

      if (!deleteResult)
        throw notModifiedError(
          lang.__("common.error.notModified", { value: this.tableName })
        );

      return { deletedCount: deleteResult };
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }
}
