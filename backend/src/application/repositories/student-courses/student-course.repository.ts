import { IDatabase } from "../../../infrastructure/database/mysql/mysql";
import { ISchema } from "../../../infrastructure/database/mysql/table-builder/interfaces/schema.interface";
import { errorHandler } from "../../../infrastructure/lib/error-handler";
import {
  notFoundError,
  notModifiedError,
} from "../../../infrastructure/lib/handler-error";
import { lang } from "../../../infrastructure/lib/lang";
import { IStudentCourseRepository } from "../../model/interfaces/student-courses/student-course-repository.interface";
import { IStudentCourseSchema } from "../../model/interfaces/student-courses/student-course-schema.interface";
import { StudentCourse } from "../../model/StudentCourse";
import { StudentCourseSchema } from "./student-course.schema";

export class StudentCourseRepository implements IStudentCourseRepository {
  tableName = "StudentCourses";
  selectableProps: string[] = [];
  db: IDatabase;
  private tableSchema: ISchema<IStudentCourseSchema>[];
  constructor(readonly mysql: IDatabase) {
    this.db = mysql;
    this.tableSchema = StudentCourseSchema;
    this.buildSelectableProps();
  }

  buildSelectableProps() {
    for (const column of this.tableSchema) {
      this.selectableProps.push(
        `${this.tableName}.${String(column.columnName)}`
      );
    }
  }

  async create(data: IStudentCourseSchema): Promise<{ insertedId: number }> {
    try {
      console.log("data", data);
      const [insertedId] = await this.db.from(this.tableName).insert(data);

      if (!insertedId)
        throw notModifiedError(
          lang.__("common.error.notModified", {
            value: this.tableName,
          })
        );

      return { insertedId };
    } catch (error) {
      console.log(error);
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async find(
    filters?: Partial<IStudentCourseSchema>
  ): Promise<StudentCourse[]> {
    try {
      const query = this.db
        .select([
          ...this.selectableProps,
          this.db.raw(`JSON_OBJECT(
          "id", c.id ,
          "code", c.code ,
          "name", c.name ,
          "description", c.description ,
          "price", c.price ,
          "createAt", c.created_at
        )  as course`),
          this.db.raw(`JSON_OBJECT(
              "id", s.id,
              "firstName", s.firstName ,
              "lastName", s.lastName ,
              "age", s.age
          ) as student`),
        ])
        .from(`${this.tableName}`)
        .leftJoin("Courses as c", `${this.tableName}.idCourse`, "c.id")
        .leftJoin("Students as s", `${this.tableName}.idStudent`, "s.id")
        .whereNull(`${this.tableName}.deleted_at`)
        .where({ ...filters });

      const result = await query;

      return result.map((res) => StudentCourse.create(res as any));
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async findById(id: number): Promise<StudentCourse> {
    try {
      const query = await this.db
        .select([
          ...this.selectableProps,
          this.db.raw(`JSON_OBJECT(
          "id", c.id ,
          "code", c.code ,
          "name", c.name ,
          "description", c.description ,
          "price", c.price ,
          "createAt", c.created_at
        )  as course`),
          this.db.raw(`JSON_OBJECT(
              "id", s.id,
              "firstName", s.firstName ,
              "lastName", s.lastName ,
              "age", s.age
          ) as student`),
        ])
        .from(`${this.tableName}`)
        .leftJoin("Courses as c", `${this.tableName}.idCourse`, "c.id")
        .leftJoin("Students as s", `${this.tableName}.idStudent`, "s.id")
        .whereNull(`${this.tableName}.deleted_at`)
        .where(this.tableName + ".id", id)
        .first();

      if (!query)
        throw notFoundError(
          lang.__("common.error.notFound", { value: this.tableName })
        );

      return StudentCourse.create(query);
    } catch (error) {
      throw errorHandler(error, lang.__("internalServerError"));
    }
  }

  async update(
    id: number,
    data: Partial<IStudentCourseSchema>
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
