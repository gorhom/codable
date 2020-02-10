import {
  models,
  isCodable,
  IModel,
  IType,
  ISubType,
  decodeValue,
  errors,
} from '../internal';

export const optional = (subType?: ISubType): IModel => {
  const $type = 'optional';
  const validate = (key: string, value: any) => {
    if (subType === undefined) {
      throw errors.missingSubType(key, $type);
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
      throw errors.subTypeNotSupported(key, $type, (subType as IType).name);
    }

    return models[(subType as IType).name]().validate(key, value);
  };

  const decode = (key: string, value: object) =>
    value === undefined
      ? undefined
      : validate(key, value)
      ? decodeValue(key, subType!, value)
      : undefined;

  return {
    validate,
    decode,
  };
};
