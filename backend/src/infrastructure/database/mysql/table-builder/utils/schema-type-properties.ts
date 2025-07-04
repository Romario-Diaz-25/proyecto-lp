/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn } from "../../mysql";
import { ISchemaTypeProperties } from "../interfaces/schema-type-properties.interface";

export const SchemaTypeProperties: ISchemaTypeProperties = {
  unique: (chain: IColumn, value: boolean) => {
    return value ? chain.unique() : chain;
  },
  unsigned: (chain: IColumn, value: boolean) => {
    return value ? chain.unsigned() : chain;
  },
  nullable: (chain: IColumn, value: boolean) => {
    if (value === false) return chain.notNullable();
    return chain.nullable();
  },
  defaultTo: (chain: IColumn, value: any) => {
    return value !== undefined ? chain.defaultTo(value) : chain;
  },
  comment: (chain: IColumn, value: string) => {
    return value ? chain.comment(value.toString()) : chain;
  },
};
