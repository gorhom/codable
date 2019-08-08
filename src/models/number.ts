import { IModel } from '../internal';

export const number: IModel = {
  validate: (value: any) => {
    if (typeof value !== 'number') {
      throw `Expected type to be 'number', but found '${typeof value}'`;
    }
    return true;
  },
  decode: (value: any) => {
    return value;
  },
};
