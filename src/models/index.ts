import {
  dateModel,
  stringModel,
  numberModel,
  booleanModel,
  arrayModel,
  optionalModel,
  IModelDictionary,
} from '../internal';

export const models: IModelDictionary = {
  date: dateModel,
  string: stringModel,
  number: numberModel,
  boolean: booleanModel,
  array: arrayModel,
  optional: optionalModel,
};
