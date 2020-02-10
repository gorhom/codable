import { IModel, errors } from '../internal';

export const boolean = (): IModel => {
  const $type = 'boolean';
  const validate = (key: string, value: any) => {
    if (value === undefined) {
      throw errors.missingValue(key, $type);
    }

    if (typeof value !== 'boolean') {
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
