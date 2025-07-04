import { TLengthOperator } from "../../mysql";

export interface ICheckLength {
  operator: TLengthOperator;
  length: number;
}
