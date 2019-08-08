import isArray from 'lodash/isArray';
import {
  models,
  isCodable,
  IModel,
  IType,
  ISubType,
  IDictionary,
  ICodingPropertyType,
  INewable,
  Codable,
  ICodable,
} from '../internal';
import get from 'lodash/get';

export const array = (subType?: ISubType): IModel => ({
  validate: (value: any) => {
    if (isArray(value) === false) {
      throw `Expected type to be 'array', but found '${typeof value}'`;
    }

    if (subType === undefined) {
      throw 'Expected subtype to be set for `array`';
    }

    if (isCodable(subType)) {
      /**
       * @DEV | while decoding `Codable` it will validate it self.
       */
      return true;
    }

    if (
      (subType as IType).name !== undefined &&
      (subType as IType).name === 'array'
    ) {
      throw 'Subtype of `array` is not supported';
    }

    return models[(subType as IType).name]().validate(value[0]);
  },
  decode: (value: object[]) => {
    if (
      subType !== undefined &&
      isCodable(subType) &&
      subType.CodingProperties
    ) {
      const result = value.map(item =>
        decodePayload(item, subType.CodingProperties)
      );

      return result;
    } else {
      return value;
    }
  },
});

const decodePayload = (
  payload: object,
  codingProperties: IDictionary<ICodingPropertyType>
) => {
  return Object.keys(codingProperties)
    .map(key => ({
      [key]: decode(key, codingProperties[key], payload),
    }))
    .reduce((properties, property) => ({ ...properties, ...property }), {});
};

const decode = (
  key: string,
  codingProperty: ICodingPropertyType,
  payload?: object
) => {
  const jsonKey = get(codingProperty, 'key', key);
  const value = get(payload, jsonKey, undefined);
  const type: IType | ICodable = get(codingProperty, 'type', codingProperty);

  if (isCodable(type)) {
    const object = Object.create(type.prototype);
    return object.constructor.call(object, value);
  }

  const model: IModel = models[type.name](type.subtype);

  if (model.validate(value) === false) {
    throw 'error';
  }

  return model.decode(value);
};
