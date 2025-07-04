/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITable } from "../../mysql";
import { ITypeOptions } from "./type-options.interface";

export interface ISchemaTypes {
  increments: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  text: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  integer: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  tinyint: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  string: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  binary: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  float: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  double: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  decimal: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  bigInteger: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  smallint: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  mediumint: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  bigint: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  boolean: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  date: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  datetime: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  timestamp: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  json: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  jsonb: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  uuid: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
  enu: (
    table: ITable,
    columnName: string,
    options: Partial<ITypeOptions>
  ) => any;
}
