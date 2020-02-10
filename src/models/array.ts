import isArray from 'lodash/isArray';
import {
  models,
  isCodable,
  IModel,
  IType,
  ISubType,
  decodePayload,
  errors,
} from '../internal';

export const array = (subType?: ISubType): IModel => {
  const $type = 'array';
  const validate = (key: string, value: any) => {
    if (value === undefined) {
      throw errors.missingValue(key, $type);
    }

    if (subType === undefined) {
      throw errors.missingSubType(key, $type);
    }

    if (isArray(value) === false) {
      throw errors.wrongType(key, $type, typeof value);
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
      throw errors.subTypeNotSupported(key, $type, (subType as IType).name);
    }

    return models[(subType as IType).name]().validate(key, value[0]);
  };

  const decode = (key: string, value: any[]) => {
    if (validate(key, value)) {
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
