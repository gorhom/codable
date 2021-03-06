import {
  models,
  IType,
  ICodingPropertyType,
  IDictionary,
  isCodable,
  BaseCodable,
  isEmpty,
  get,
  errors,
} from '../internal';
import { IModel, INewable, IBaseCodable, ICodable } from './types';

export const decode = <T extends BaseCodable>(
  type: INewable<T>,
  json: any
): T & IBaseCodable =>
  decodeCodable({
    type,
    json,
    isRoot: true,
  });

export const decodeCodable = <T extends BaseCodable>({
  type,
  json,
  isRoot,
  key,
}: {
  type: INewable<T>;
  json: any;
  isRoot: boolean;
  key?: string;
}): T & IBaseCodable => {
  if (isRoot === false && isEmpty(json) === true) {
    throw errors.missingValue(key || '', typeof type);
  }
  let result = new type(json);
  // @ts-ignore
  if (json !== undefined && type.CodingProperties !== undefined) {
    // @ts-ignore
    Object.assign(result, decodePayload(json, type.CodingProperties));
  }
  // @ts-ignore
  return result;
};

export const decodePayload = (
  payload: object,
  codingProperties: IDictionary<ICodingPropertyType>
) => {
  return Object.keys(codingProperties)
    .map(key => ({
      [key]: decodeProperty({
        key,
        codingProperty: codingProperties[key],
        payload,
      }),
    }))
    .reduce((properties, property) => ({ ...properties, ...property }), {});
};

export const decodeProperty = ({
  key,
  codingProperty,
  payload,
}: {
  key: string;
  codingProperty: ICodingPropertyType;
  payload?: object;
}) => {
  const jsonKey = get(codingProperty, 'key', key);
  const value = get(payload, jsonKey, undefined);
  const type: IType | ICodable = get(codingProperty, 'type', codingProperty);
  return decodeValue({ key: jsonKey, type, value });
};

export const decodeValue = ({
  key,
  type,
  value,
}: {
  key: string;
  type: IType | ICodable;
  value?: object;
}) => {
  if (isCodable(type)) {
    return decodeCodable({
      type,
      json: value,
      isRoot: false,
      key,
    });
  }
  const model: IModel = models[type.name](type);
  return model.validate(key, value) ? model.decode(key, value) : undefined;
};
