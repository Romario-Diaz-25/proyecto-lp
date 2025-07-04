/* eslint-disable @typescript-eslint/no-explicit-any */
import { IForeign } from "./foreign.interface";
import { ITypeOptions } from "./type-options.interface";
import { ITypeProperties } from "./type-properties.interface";
import { IChecks } from "./checks.interface";
import { ISchemaTypes } from "./schema-types.interface";

export interface ISchema<T> {
  columnName: keyof T;
  type: keyof ISchemaTypes;
  typeOptions?: Partial<ITypeOptions>;
  typeProperties?: Partial<ITypeProperties>;
  foreign?: IForeign;
  checks?: Partial<IChecks>;
}
