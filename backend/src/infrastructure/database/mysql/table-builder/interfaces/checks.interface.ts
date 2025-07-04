import { ICheckLength } from "./check-length.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IChecks {
  checkPositive: {
    value: boolean;
    constraintName?: string;
  };
  checkIn: {
    value: Array<any>;
    constraintName?: string;
  };
  checkNotIn: {
    value: Array<any>;
    constraintName?: string;
  };
  checkBetween: {
    value: Array<number> | Array<Array<number>>;
    constraintName?: string;
  };
  checkLength: {
    value: ICheckLength;
    constraintName?: string;
  };
  checkRegex: {
    value: string;
    constraintName?: string;
  };
}
