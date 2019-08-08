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
  type: IType | INewable<Codable>;
  key?: string;
}

export type ICodingPropertyType = ICodingProperty | IType | INewable<Codable>;

export type ISubType = IType | Codable;

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

export const isCodable = (
  type: IType | INewable<Codable>
): type is { new (...args: any[]): Codable } =>
  get(type, '__proto__.name', '') === Codable.name;
