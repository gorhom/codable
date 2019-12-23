import { ICodingPropertyType, IDictionary, IBaseCodable } from './internal';

export abstract class BaseCodable implements IBaseCodable {
  public static CodingProperties: IDictionary<ICodingPropertyType>;
  constructor(payload: object) {}
  public toJSON = () => '';
}
