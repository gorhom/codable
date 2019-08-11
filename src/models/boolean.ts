import { IModel } from '../internal';

export const boolean = (): IModel => {
  const validate = (value: any) => {
    if (value === undefined) {
      throw `Missing value for a non optional property`;
    }

    if (typeof value !== 'boolean') {
      throw `Expected type to be 'boolean', but found '${typeof value}'`;
    }
    return true;
  };
  const decode = (value: any) => value;

  return {
    validate,
    decode,
  };
};
