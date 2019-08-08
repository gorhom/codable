import has from 'lodash/has';
import get from 'lodash/get';
import {
  IType,
  ICodingPropertyType,
  Codable,
  ISubType,
  types,
} from './internal';

export interface ICodingProperty {
  type: IType | ICodable;
  key?: string;
}

export type ICodingPropertyType = ICodingProperty | IType | ICodable;

export type ISubType = IType | ICodable;

export interface IType {
  name: keyof typeof types;
  subtype?: ISubType;
}

export interface IModel {
  validate: (value: any) => boolean;
  decode: (value: any) => any;
}

export type IModelDictionary = {
  [key in keyof typeof types]: (subType?: ISubType) => IModel;
};

export type INewable<T> = new (...args: any[]) => T;

export interface IDictionary<T> {
  [index: string]: T;
}

export type ICodable = INewable<Codable> & {
  CodingProperties: IDictionary<ICodingPropertyType>;
};

export const isCodable = (type: ISubType): type is ICodable =>
  get(type, '__proto__.name', '') === Codable.name;
