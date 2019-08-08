import { IModel } from '../internal';

export const string: IModel = {
  validate: (value: any) => {
    if (typeof value !== 'string') {
      throw `Expected type to be 'string', but found '${typeof value}'`;
    }
    return true;
  },
  decode: (value: any) => {
    return value;
  },
};
