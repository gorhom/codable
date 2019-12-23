import isArray from 'lodash/isArray';
import {
  models,
  isCodable,
  IModel,
  IType,
  ISubType,
  decodePayload,
} from '../internal';

export const array = (subType?: ISubType): IModel => {
  const validate = (value: any) => {
    if (value === undefined) {
      throw `Missing value for a non optional property`;
    }

    if (subType === undefined) {
      throw 'Expected subtype to be set for `array`';
    }

    if (isArray(value) === false) {
      throw `Expected type to be 'array', but found '${typeof value}'`;
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
  };

  const decode = (value: any[]) => {
    if (validate(value)) {
      if (isCodable(subType!)) {
        return value.map(item => decodePayload(item, subType.CodingProperties));
      }
      return value;
    } else {
      return undefined;
    }
  };

  return {
    validate,
    decode,
  };
};
