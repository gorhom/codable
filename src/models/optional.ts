import {
  models,
  isCodable,
  IModel,
  IType,
  decodeValue,
  errors,
} from '../internal';

export const optional = (type: IType): IModel => {
  const validate = (key: string, value: any) => {
    if (type.subtype === undefined) {
      throw errors.missingSubType(key, type.name);
    }

    if (value === undefined) {
      return true;
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
      value
    );
  };
  const decode = (key: string, value: object) =>
    value === undefined
      ? undefined
      : validate(key, value)
      ? decodeValue({
          key,
          type: type.subtype!,
          value,
        })
      : undefined;
  const encode = (key: string, value: any) => value;
  return {
    validate,
    decode,
    encode,
  };
};
