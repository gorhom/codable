import get from 'lodash/get';
import { Codable, ISubType, ICodable } from '../internal';

export const isCodable = (type: ISubType): type is ICodable =>
  get(type, '__proto__.name', '') === Codable.name;
