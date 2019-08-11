import { IModel } from '../internal';

export const number = (): IModel => {
  const validate = (value: any) => {
    if (value === undefined) {
      throw `Missing value for a non optional property`;
    }

    if (typeof value !== 'number') {
      throw `Expected type to be 'number', but found '${typeof value}'`;
    }
    return true;
  };
  const decode = (value: any) => value;

  return {
    validate,
    decode,
  };
};
