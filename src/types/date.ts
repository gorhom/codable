import { IType, IDateParser } from '../internal';

export const date = (parser: IDateParser): IType => ({
  name: 'date',
  parser,
});
