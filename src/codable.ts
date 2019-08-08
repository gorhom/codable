import get from 'lodash/get';
import {
  models,
  IType,
  IModel,
  ICodingPropertyType,
  IDictionary,
  ICodable,
  isCodable,
} from './internal';

export class Codable {
  static CodingProperties: IDictionary<ICodingPropertyType>;

  [key: string]: any;

  constructor(payload: object) {
    const codingProperties = this.getCodingProperties();

    Object.keys(codingProperties).forEach(key => {
      this[key] = this.decode(key, codingProperties[key], payload);
    });
  }

  private decode = (
    key: string,
    codingProperty: ICodingPropertyType,
    payload?: object
  ) => {
    const jsonKey = get(codingProperty, 'key', key);
    const value = get(payload, jsonKey, undefined);
    const type: IType | ICodable = get(codingProperty, 'type', codingProperty);

    if (isCodable(type)) {
      const object = Object.create(type.prototype);
      return object.constructor.call(object, value);
    }

    const model: IModel = models[type.name](type.subtype);

    if (model.validate(value) === false) {
      throw 'error';
    }

    return model.decode(value);
  };

  private getCodingProperties = (): IDictionary<ICodingPropertyType> => {
    return get(this, '__proto__.constructor.CodingProperties', {});
  };
}
