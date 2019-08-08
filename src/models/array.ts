import isArray from 'lodash/isArray';
import { IModel, IType, models, ISubType } from '../internal';

export const array = (subType?: ISubType): IModel => ({
  validate: (value: any) => {
    if (isArray(value) === false) {
      throw `Expected type to be 'array', but found '${typeof value}'`;
    }

    if (subType === undefined) {
      throw 'Expected subtype to be set for `array`';
    }

    if (typeof subType === 'function') {
      throw 'Subtype of `Codable` is not supported';
    }

    if (
      (subType as IType).name !== undefined &&
      (subType as IType).name === 'array'
    ) {
      throw 'Subtype of `array` is not supported';
    }

    return models[(subType as IType).name]().validate(value[0]);
  },
  decode: (value: any) => {
    return value;
  },
});
