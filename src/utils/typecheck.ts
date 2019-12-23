import get from 'lodash/get';
import { ISubType, BaseCodable, ICodable } from '../internal';

export const isCodable = (type: ISubType): type is ICodable =>
  get(type, 'prototype', null) instanceof BaseCodable;