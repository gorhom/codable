import { IModel } from '../internal';

export const string = (): IModel => {
  const validate = (value: any) => {
    if (value === undefined) {
      throw `Missing value for a non optional property`;
    }

    if (typeof value !== 'string') {
      throw `Expected type to be 'string', but found '${typeof value}'`;
    }
    return true;
  };
  const decode = (value: any) => value;

  return {
    validate,
    decode,
  };
};
