/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn } from "../../mysql";

export interface ISchemaChecks {
  checkPositive: (
    chain: IColumn,
    value: boolean,
    constraintName?: string
  ) => any;
  checkIn: (chain: IColumn, value: Array<any>, constraintName?: string) => any;
  checkNotIn: (
    chain: IColumn,
    value: Array<any>,
    constraintName?: string
  ) => any;
  checkBetween: (
    chain: IColumn,
    value: Array<any>,
    constraintName?: string
  ) => any;
  checkLength: (chain: IColumn, value: any, constraintName?: string) => any;
  checkRegex: (chain: IColumn, value: string, constraintName?: string) => any;
}
