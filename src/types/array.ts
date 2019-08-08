import { IType, ISubType } from '../internal';

export const array = (subtype: ISubType): IType => ({
  name: 'array',
  subtype,
});
