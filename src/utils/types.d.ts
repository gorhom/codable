import has from 'lodash/has';
import get from 'lodash/get';
import { types, BaseCodable } from '../internal';

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
  validate: (key: string, value: any) => boolean;
  decode: (key: string, value: any) => any;
}

export type IModelDictionary = {
  [key in keyof typeof types]: (subType?: ISubType) => IModel;
};

export type INewable<T> = new (...args: any[]) => T;

export interface IDictionary<T> {
  [index: string]: T;
}

export interface IBaseCodable {
  toJSON: () => string;
}

interface IBaseCodableStatic {
  CodingProperties: IDictionary<ICodingPropertyType>;
}

export type ICodable = INewable<BaseCodable> & IBaseCodableStatic;
