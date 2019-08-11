import {
  models,
  isCodable,
  IModel,
  IType,
  ISubType,
  decodeValue,
} from '../internal';

export const optional = (subType?: ISubType): IModel => {
  const validate = (value: any) => {
    if (subType === undefined) {
      throw 'Expected subtype to be set for `optional`';
    }

    if (value === undefined) {
      return true;
    }

    if (isCodable(subType)) {
      /**
       * @DEV | while decoding `Codable` it will validate it self.
       */
      return true;
    }

    if (
      (subType as IType).name !== undefined &&
      (subType as IType).name === 'optional'
    ) {
      throw 'Subtype of `optional` is not supported';
    }

    return models[(subType as IType).name]().validate(value);
  };

  const decode = (value: object) =>
    value === undefined
      ? undefined
      : validate(value)
      ? decodeValue(subType!, value)
      : undefined;

  return {
    validate,
    decode,
  };
};
