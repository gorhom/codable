import { IType, Codable } from '../internal';

export const array = (subtype: IType | Codable): IType => ({
  name: 'array',
  subtype,
});
