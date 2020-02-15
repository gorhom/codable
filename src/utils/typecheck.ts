import { ISubType, BaseCodable, ICodable, get } from '../internal';

export const isCodable = (type: ISubType): type is ICodable =>
  get(type, 'prototype', null) instanceof BaseCodable;
