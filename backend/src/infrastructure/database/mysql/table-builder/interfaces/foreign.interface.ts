import { ForeignOnAction } from "../schema.types";

export interface IForeign {
  references: string;
  inTable: string;
  onUpdate?: ForeignOnAction;
  onDelete?: ForeignOnAction;
}
