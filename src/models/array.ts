import isArray from 'lodash/isArray';
import {
  models,
  isCodable,
  IModel,
  IType,
  decodePayload,
  errors,
} from '../internal';

export const array = (type: IType): IModel => {
  const validate = (key: string, value: any) => {
    if (value === undefined) {
      throw errors.missingValue(key, type.name);
    }

    if (type.subtype === undefined) {
      throw errors.missingSubType(key, type.name);
    }

    if (isArray(value) === false) {
      throw errors.wrongType(key, type.name, typeof value);
    }

    if (isCodable(type.subtype)) {
      /**
       * @DEV | while decoding `Codable` it will validate it self.
       */
      return true;
    }

    if (
      (type.subtype as IType).name !== undefined &&
      (type.subtype as IType).name === type.name
    ) {
      throw errors.subTypeNotSupported(
        key,
        type.name,
        (type.subtype as IType).name
      );
    }

    return models[(type.subtype as IType).name](type.subtype).validate(
      key,
      value[0]
    );
  };

  const decode = (key: string, value: any[]) => {
    if (validate(key, value)) {
      const { subtype } = type;
      if (subtype !== undefined && isCodable(subtype)) {
        return value.map(item => decodePayload(item, subtype.CodingProperties));
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
