import { IDatabase } from "../../../infrastructure/database/mysql/mysql";
import { ISchema } from "../../../infrastructure/database/mysql/table-builder/interfaces/schema.interface";
import { errorHandler } from "../../../infrastructure/lib/error-handler";
import {
  notFoundError,
  notModifiedError,
} from "../../../infrastructure/lib/handler-error";
import { lang } from "../../../infrastructure/lib/lang";
import { Course } from "../../model/Course";
import { ICourseRepository } from "../../model/interfaces/courses/course-repository.interface";
import { ICourseSchema } from "../../model/interfaces/courses/course-schema.interface";
import { CourseSchema } from "./course.schema";

export class CourseRepository implements ICourseRepository {
  tableName = "Courses";
  selectableProps: string[] = [];
  db: IDatabase;
  private tableSchema: ISchema<ICourseSchema>[];
  constructor(readonly mysql: IDatabase) {
    this.db = mysql;
    this.tableSchema = CourseSchema;
    this.buildSelectableProps();
  }

  buildSelectableProps() {
    for (const column of this.tableSchema) {
      this.selectableProps.push(
        `${this.tableName}.${String(column.columnName)}`
      );
    }
  }

  async create(data: ICourseSchema): Promise<{ insertedId: number }> {
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

  async find(filters?: Partial<ICourseSchema>): Promise<Course[]> {
    try {
      const query = this.db
        .select(this.selectableProps)
        .from(this.tableName)
        .whereNull("deleted_at")
        .where({ ...filters });

      const result = await query;

      return result.map((res) => Course.create(res));
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async findById(id: number): Promise<Course> {
    try {
      const query = await this.db
        .select(this.selectableProps)
        .from(this.tableName)
        .whereNull("deleted_at")
        .where({ id })
        .first();

      if (!query)
        throw notFoundError(
          lang.__("common.error.notFound", { value: this.tableName })
        );

      return Course.create(query);
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async update(
    id: number,
    data: Partial<ICourseSchema>
  ): Promise<{ modifiedCount: number }> {
    try {
      const updateResult = await this.db
        .from(this.tableName)
        .update(data)
        .where({ id })
        .whereNull("deleted_at");

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
        .del()
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
