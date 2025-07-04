import { IDatabase } from "../../../infrastructure/database/mysql/mysql";
import { ISchema } from "../../../infrastructure/database/mysql/table-builder/interfaces/schema.interface";
import { AppDate } from "../../../infrastructure/lib/app-date";
import { errorHandler } from "../../../infrastructure/lib/error-handler";
import {
  notFoundError,
  notModifiedError,
} from "../../../infrastructure/lib/handler-error";
import { lang } from "../../../infrastructure/lib/lang";
import { IStudentRepository } from "../../model/interfaces/students/student-repository.interface";
import { IStudentSchema } from "../../model/interfaces/students/student-schema.interface";
import { Student } from "../../model/Student";
import { StudentSchema } from "./student.schema";

export class StudentsRepository implements IStudentRepository {
  tableName = "Students";
  selectableProps: string[] = [];
  db: IDatabase;
  private tableSchema: ISchema<IStudentSchema>[];
  constructor(readonly mysql: IDatabase) {
    this.db = mysql;
    this.tableSchema = StudentSchema;
    this.buildSelectableProps();
  }

  buildSelectableProps() {
    for (const column of this.tableSchema) {
      this.selectableProps.push(
        `${this.tableName}.${String(column.columnName)}`
      );
    }
  }

  async decrementLifes(id: number): Promise<{ modifiedCount: number }> {
    try {
      const updateResult = await this.db
        .from(this.tableName)
        .update({ lifes: this.db.raw("lifes - 1") })
        .where({ id });

      if (!updateResult)
        throw notModifiedError(
          lang.__("common.error.notModified", { value: this.tableName })
        );

      return { modifiedCount: updateResult };
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async create(data: IStudentSchema): Promise<{ insertedId: number }> {
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

  async find(filters?: Partial<IStudentSchema>): Promise<Student[]> {
    try {
      const query = this.db
        .select(this.selectableProps)
        .from(this.tableName)
        .where({ ...filters });

      const result = await query;

      return result.map((res) => Student.create(res));
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async findById(id: number): Promise<Student> {
    try {
      const query = await this.db
        .select(this.selectableProps)
        .from(this.tableName)
        .where({ id })
        .first();

      if (!query)
        throw notFoundError(
          lang.__("common.error.notFound", { value: this.tableName })
        );

      return Student.create(query);
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async update(
    id: number,
    data: Partial<IStudentSchema>
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
