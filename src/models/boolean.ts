import { IModel, IType, errors } from '../internal';

export const boolean = (type: IType): IModel => {
  const validate = (key: string, value: any) => {
    if (value === undefined) {
      throw errors.missingValue(key, type.name);
    }

    if (typeof value !== type.name) {
      throw errors.wrongType(key, type.name, typeof value);
    }
    return true;
  };
  const decode = (key: string, value: any) => value;
  const encode = (key: string, value: any) => value;
  return {
    validate,
    decode,
    encode,
  };
};
