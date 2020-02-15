import { types, BaseCodable } from '../internal';

export interface ICodingProperty {
  type: IType | ICodable;
  key?: string;
}

export type ICodingPropertyType = ICodingProperty | IType | ICodable;

export type ISubType = IType | ICodable;

export type IDateParser = (value: string | number) => Date;

export interface IType {
  name: keyof typeof types;
  subtype?: ISubType;
  parser?: IDateParser;
}

export interface IModel {
  validate: (key: string, value: any) => boolean;
  decode: (key: string, value: any) => any;
}

export type IModelDictionary = {
  [key in keyof typeof types]: (type: IType) => IModel;
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
