import { IModel, errors } from '../internal';

export const number = (): IModel => {
  const $type = 'number';
  const validate = (key: string, value: any) => {
    if (value === undefined) {
      throw errors.missingValue(key, $type);
    }

    if (typeof value !== 'number') {
      throw errors.wrongType(key, $type, typeof value);
    }
    return true;
  };
  const decode = (key: string, value: any) => value;

  return {
    validate,
    decode,
  };
};
