import { IModel } from '../internal';

export const boolean: IModel = {
  validate: (value: any) => {
    if (typeof value !== 'boolean') {
      throw `Expected type to be 'boolean', but found '${typeof value}'`;
    }
    return true;
  },
  decode: (value: any) => {
    return value;
  },
};
