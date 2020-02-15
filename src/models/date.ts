import { IModel, IType, stringType, numberType, errors } from '../internal';

export const date = (type: IType): IModel => {
  const validate = (key: string, value: any) => {
    if (type.parser === undefined || type.parser === null) {
      throw errors.missingParser(key, type.name);
    }

    if (value === undefined) {
      throw errors.missingValue(key, type.name);
    }

    if (typeof value !== stringType.name && typeof value !== numberType.name) {
      throw errors.wrongType(
        key,
        `${stringType.name} or ${numberType.name}`,
        typeof value
      );
    }
    return true;
  };

  const decode = (key: string, value: any) => {
    try {
      return type.parser!(value);
    } catch (error) {
      throw errors.failToParse(key, value, error.message || error);
    }
  };

  return {
    validate,
    decode,
  };
};
