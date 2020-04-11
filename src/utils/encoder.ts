import {
  models,
  IType,
  ICodingPropertyType,
  isCodable,
  BaseCodable,
  get,
  errors,
} from '../internal';
import { IModel, ICodable } from './types';

export const encode = <T extends BaseCodable>(codable: T): any => {
  if (!(codable instanceof BaseCodable)) {
    throw errors.invalidCodable();
  }

  // @ts-ignore
  if (!codable.__proto__.constructor.CodingProperties) {
    throw errors.missingCodingProperties();
  }

  // @ts-ignore
  const codingProperties = codable.__proto__.constructor.CodingProperties;

  // @ts-ignore
  return Object.keys(codingProperties)
    .map(key =>
      // @ts-ignore
      encodeProperty({
        key,
        codingProperty: codingProperties[key],
        codable,
      })
    )
    .reduce((result, item) => {
      // @ts-ignore
      result[item.key] = item.value;
      return result;
    }, {});
};

const encodeProperty = ({
  key,
  codingProperty,
  codable,
}: {
  key: string;
  codingProperty: ICodingPropertyType;
  codable: BaseCodable;
}) => {
  const jsonKey = get(codingProperty, 'key', key);
  const type: IType | ICodable = get(codingProperty, 'type', codingProperty);

  return encodeValue({
    key: jsonKey,
    type,
    // @ts-ignore
    value: codable[key],
    codable,
  });
};

const encodeValue = ({
  key,
  type,
  value,
  codable,
}: {
  key: string;
  type: IType | ICodable;
  value?: object;
  codable: BaseCodable;
}) => {
  if (isCodable(type)) {
    return {
      key,
      // @ts-ignore
      value: encode(value),
    };
  }
  const model: IModel = models[type.name](type);
  return {
    key,
    value: model.encode(key, value),
  };
};
