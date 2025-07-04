import { ITable } from "../../mysql";
import { ISchemaTypes } from "../interfaces/schema-types.interface";
import { ITypeOptions } from "../interfaces/type-options.interface";

export const SchemaTypes: ISchemaTypes = {
  increments: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => table.increments(columnName, { primaryKey: options.primaryKey }),
  text: (table: ITable, columnName: string, options: Partial<ITypeOptions>) =>
    table.text(columnName, options.textType),
  integer: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => table.integer(columnName, options.length),
  tinyint: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => table.tinyint(columnName, options.length),
  string: (table: ITable, columnName: string, options: Partial<ITypeOptions>) =>
    table.string(columnName, options.length),
  binary: (table: ITable, columnName: string, options: Partial<ITypeOptions>) =>
    table.binary(columnName, options.length),
  float: (table: ITable, columnName: string, options: Partial<ITypeOptions>) =>
    table.float(columnName, options.precision, options.scale),
  double: (table: ITable, columnName: string, options: Partial<ITypeOptions>) =>
    table.double(columnName, options.precision, options.scale),
  decimal: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => table.decimal(columnName, options.precision, options.scale),
  bigInteger: (
    table: ITable,
    columnName: string,
    _options: Partial<ITypeOptions>
  ) => table.bigInteger(columnName),
  smallint: (
    table: ITable,
    columnName: string,
    _options: Partial<ITypeOptions>
  ) => table.smallint(columnName),
  mediumint: (
    table: ITable,
    columnName: string,
    _options: Partial<ITypeOptions>
  ) => table.mediumint(columnName),
  bigint: (
    table: ITable,
    columnName: string,
    _options: Partial<ITypeOptions>
  ) => table.bigint(columnName),
  boolean: (
    table: ITable,
    columnName: string,
    _options: Partial<ITypeOptions>
  ) => table.boolean(columnName),
  date: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) =>
    table.date(columnName),
  datetime: (
    table: ITable,
    columnName: string,
    _options: Partial<ITypeOptions>
  ) => table.datetime(columnName),
  timestamp: (
    table: ITable,
    columnName: string,
    _options: Partial<ITypeOptions>
  ) => table.timestamp(columnName),
  json: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) =>
    table.json(columnName),
  jsonb: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) =>
    table.jsonb(columnName),
  uuid: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) =>
    table.uuid(columnName),
  enu: (table: ITable, columnName: string, options: Partial<ITypeOptions>) =>
    table.enu(columnName, options.values ?? []),
};
