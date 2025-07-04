/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn } from "../../mysql";

export interface ISchemaTypeProperties {
  unique: (chain: IColumn, value: boolean) => any;
  unsigned: (chain: IColumn, value: boolean) => any;
  nullable: (chain: IColumn, value: boolean) => any;
  defaultTo: (chain: IColumn, value: any) => any;
  comment: (chain: IColumn, value: any) => any;
}
