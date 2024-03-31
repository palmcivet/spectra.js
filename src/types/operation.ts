export type Operation =
  | '='
  | '!='
  | '<>'
  | '>'
  | '>='
  | '<'
  | '<='
  | 'in'
  | 'nin'
  | 'not_in';

export enum OperationEnum {
  EQ = '=',
  NEQ = '!=',
  NEQ2 = '<>',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
  IN = 'in',
  NIN = 'nin',
  NOT_IN = 'not_in',
}