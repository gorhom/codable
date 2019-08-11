import {
  stringModel,
  numberModel,
  booleanModel,
  arrayModel,
  optionalModel,
  IModelDictionary,
} from '../internal';

export const models: IModelDictionary = {
  string: stringModel,
  number: numberModel,
  boolean: booleanModel,
  array: arrayModel,
  optional: optionalModel,
};
