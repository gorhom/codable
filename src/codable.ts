import get from 'lodash/get';
import { ICodingPropertyType, IDictionary, decodePayload } from './internal';

export class Codable {
  static CodingProperties: IDictionary<ICodingPropertyType>;
  [key: string]: any;

  constructor(payload: object) {
    Object.assign(this, decodePayload(payload, this.getCodingProperties()));
  }

  private getCodingProperties = (): IDictionary<ICodingPropertyType> => {
    return get(this, '__proto__.constructor.CodingProperties', {});
  };
}
