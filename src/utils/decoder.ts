import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import {
  models,
  IType,
  ICodingPropertyType,
  IDictionary,
  isCodable,
  BaseCodable,
} from '../internal';
import { IModel, INewable, IBaseCodable, ICodable } from './types';

export const decode = <T extends BaseCodable>(
  type: INewable<T>,
  json: any
): T & IBaseCodable => decodeCodable(type, json, true);

const decodeCodable = <T extends BaseCodable>(
  type: INewable<T>,
  json: any,
  isRoot: boolean
): T & IBaseCodable => {
  if (isRoot === false && isEmpty(json) === true) {
    throw `Missing value for a non optional property`;
  }

  let result = new type(json);

  // @ts-ignore
  if (json !== undefined && type.CodingProperties !== undefined) {
    // @ts-ignore
    Object.assign(result, decodePayload(json, type.CodingProperties));
  }

  return result;
};

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

  return decodeValue(jsonKey, type, value);
};

export const decodeValue = (
  key: string,
  type: IType | ICodable,
  value?: object
) => {
  if (isCodable(type)) {
    return decodeCodable(type, value, false);
  }

  const model: IModel = models[type.name](type.subtype);
  return model.validate(key, value) ? model.decode(key, value) : undefined;
};
