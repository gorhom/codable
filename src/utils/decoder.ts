import get from 'lodash/get';
import {
  models,
  IType,
  ICodingPropertyType,
  IDictionary,
  ICodable,
  isCodable,
} from '../internal';
import { IModel } from './types';

export const decodePayload = (
  payload: object,
  codingProperties: IDictionary<ICodingPropertyType>
) => {
  return Object.keys(codingProperties)
    .map(key => ({
      [key]: decodeProperty(key, codingProperties[key], payload),
    }))
    .reduce((properties, property) => ({ ...properties, ...property }), {});
};

export const decodeProperty = (
  key: string,
  codingProperty: ICodingPropertyType,
  payload?: object
) => {
  const jsonKey = get(codingProperty, 'key', key);
  const value = get(payload, jsonKey, undefined);
  const type: IType | ICodable = get(codingProperty, 'type', codingProperty);

  return decodeValue(type, value);
};

export const decodeValue = (type: IType | ICodable, value?: object) => {
  if (isCodable(type)) {
    const object = Object.create(type.prototype);
    return object.constructor.call(object, value);
  }
  const model: IModel = models[type.name](type.subtype);
  return model.validate(value) ? model.decode(value) : undefined;
};
