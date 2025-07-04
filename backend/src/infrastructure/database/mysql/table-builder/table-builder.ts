/* eslint-disable @typescript-eslint/no-explicit-any */
import { appConsole } from "../../../utils/app-console";
import { IDatabase, ITable } from "../mysql";
import { IChecks } from "./interfaces/checks.interface";
import { IForeign } from "./interfaces/foreign.interface";
import { ISchemaChecks } from "./interfaces/schema-checks.interface";
import { ISchemaTypeProperties } from "./interfaces/schema-type-properties.interface";
import { ISchema } from "./interfaces/schema.interface";
import { ITypeProperties } from "./interfaces/type-properties.interface";
import { SchemaChecks } from "./utils/schema-checks";
import { SchemaTypeProperties } from "./utils/schema-type-properties";
import { SchemaTypes } from "./utils/schema-types";

export class TableBuilder<T> {
  tableName!: string;
  tableSchema!: ISchema<T>[];

  constructor(readonly database: IDatabase) {}

  init(name: string, schema: ISchema<T>[]) {
    this.tableName = name;
    this.tableSchema = schema;

    this.checkTable();
  }

  async checkTable() {
    await this.database.schema
      .hasTable(this.tableName)
      .then((table) => (table ? this.checkColumns() : this.createTable()));
  }

  async createTable() {
    return await this.database.schema.createTable(this.tableName, (table) => {
      for (const columSchema of this.tableSchema) {
        this.buildSchema(table, columSchema);
      }
      appConsole.log(`Table ${this.tableName} was created correctly.`);
    });
  }

  async checkColumns() {
    for (const columSchema of this.tableSchema) {
      await this.database.schema
        .hasColumn(this.tableName, String(columSchema.columnName))
        .then(async (exists) => {
          if (exists) return;
          return await this.database.schema.alterTable(
            this.tableName,
            async (table) => {
              await this.buildSchema(table, columSchema);
              appConsole.log(
                `Column ${String(
                  columSchema.columnName
                )} was created in Table ${this.tableName} correctly.`
              );
            }
          );
        });
    }
  }

  async buildSchema(table: ITable, columSchema: ISchema<T>) {
    let columnBuilder = await SchemaTypes[columSchema.type](
      table,
      String(columSchema.columnName),
      columSchema.typeOptions ?? {}
    );

    columnBuilder = await this.buildColumnTypeOptions(
      columnBuilder,
      columSchema.typeProperties
    );
    await this.buildColumnChecks(columnBuilder, columSchema.checks);

    await this.buildForeignColumn(
      table,
      String(columSchema.columnName),
      columSchema.foreign
    );
  }

  async buildColumnTypeOptions(
    columnBuilder: any,
    typeProperties?: Partial<ITypeProperties>
  ) {
    if (!typeProperties) return columnBuilder;

    let builder = columnBuilder;
    for (const [key, value] of Object.entries(typeProperties)) {
      if (!(key in SchemaTypeProperties)) continue;

      const keyString = key as keyof ISchemaTypeProperties;
      builder = await SchemaTypeProperties[keyString](columnBuilder, value);
    }
    return builder;
  }

  async buildColumnChecks(columnBuilder: any, checks?: Partial<IChecks>) {
    if (!checks) return columnBuilder;

    let builder = columnBuilder;
    for (const [key, value] of Object.entries(checks)) {
      if (!(key in SchemaChecks)) continue;

      const keyString = key as keyof ISchemaChecks;
      builder = await SchemaChecks[keyString](
        columnBuilder,
        value.value,
        value.constraintName
      );
    }
    return builder;
  }

  async buildForeignColumn(
    table: ITable,
    columnName: string,
    foreign?: IForeign
  ) {
    if (!foreign) return;
    table
      .foreign(columnName)
      .references(foreign.inTable)
      .onUpdate(foreign.onUpdate ?? "NO ACTION")
      .onDelete(foreign.onDelete ?? "NO ACTION");
  }
}
