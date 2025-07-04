/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn } from "../../mysql";
import { ICheckLength } from "../interfaces/check-length.interface";
import { ISchemaChecks } from "../interfaces/schema-checks.interface";

export const SchemaChecks: ISchemaChecks = {
  checkPositive: (chain: IColumn, value: boolean, constraintName?: string) => {
    return value ? chain.checkPositive(constraintName) : chain;
  },
  checkIn: (chain: IColumn, value: Array<any>, constraintName?: string) => {
    return value?.length ? chain.checkIn(value, constraintName) : chain;
  },
  checkNotIn: (chain: IColumn, value: Array<any>, constraintName?: string) => {
    return value?.length ? chain.checkNotIn(value, constraintName) : chain;
  },
  checkBetween: (
    chain: IColumn,
    value: Array<any>,
    constraintName?: string
  ) => {
    return value?.length ? chain.checkBetween(value, constraintName) : chain;
  },
  checkLength: (chain: IColumn, value: any, constraintName?: string) => {
    const valueData = value as ICheckLength;
    return valueData
      ? chain.checkLength(valueData.operator, valueData.length, constraintName)
      : chain;
  },
  checkRegex: (chain: IColumn, value: string, constraintName?: string) => {
    return value ? chain.checkRegex(value, constraintName) : chain;
  },
};
