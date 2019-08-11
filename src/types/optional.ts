import { IType, ISubType } from '../internal';

export const optional = (subtype: ISubType): IType => ({
  name: 'optional',
  subtype,
});
