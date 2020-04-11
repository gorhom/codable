import { ICodingPropertyType, IDictionary, IBaseCodable } from './internal';

// @ts-ignore
export abstract class BaseCodable implements IBaseCodable {
  public static CodingProperties: IDictionary<ICodingPropertyType>;
  constructor(payload: object) {}
}
