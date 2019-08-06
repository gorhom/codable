import isNil from 'lodash/isNil';
import isNaN from 'lodash/isNaN';
import get from 'lodash/get';

type CodingPropertyType =
  | typeof String
  | typeof Number
  | typeof Boolean
  | typeof Codable;

interface CodingProperty {
  type: CodingPropertyType;
  key?: string;
  optional?: boolean;
}

export class Codable {
  static CodingProperties: {
    [key: string]: CodingProperty | CodingPropertyType;
  };

  constructor(payload: object) {
    const codingProperties = this.getCodingProperties();

    Object.keys(codingProperties).forEach(key => {
      // @ts-ignore
      this[key] = this.decode(key, codingProperties[key], payload);
    });
  }

  private decode = (
    key: string,
    codingProperty: CodingProperty | CodingPropertyType,
    payload?: object
  ) => {
    const optional = get(codingProperty, 'optional', false);
    const type = get(codingProperty, 'type', codingProperty);
    const jsonKey = get(codingProperty, 'key', key);
    const value = get(payload, jsonKey, undefined);

    if (isNil(value) || isNaN(value)) {
      if (optional === false) {
        throw `Missing a non optional property '${key}'`;
      } else {
        return undefined;
      }
    }

    const valueType = Object.getPrototypeOf(value);
    const propertyType = Object.create(type.prototype);

    if (valueType !== type.prototype) {
      throw `Expected type to be '${
        type.name
      }', but found '${typeof value}' for property '${key}'`;
    }

    const decodedValue = propertyType.constructor.call(propertyType, value);

    if (optional === false && (isNil(decodedValue) || isNaN(decodedValue))) {
      throw `Fail to parse property '${key}' with provided type of '${
        type.name
      }', property value is ${typeof value}`;
    }

    return decodedValue;
  };

  // @ts-ignore
  // constructor(payload: object) {
  //   // Step one
  //   const codingKeys = this.getCodingKeys(payload);

  //   Object.keys(codingKeys).forEach(key => {
  //     // const type = codingKeys[key];

  //     // // @ts-ignore
  //     // if (payload[key] === undefined) {
  //     //   throw new Error(`missing '${key}'`);
  //     // }

  //     // if (type.prototype instanceof Codable) {
  //     //   // @ts-ignore
  //     //   const object = Object.create(type.prototype);
  //     //   // @ts-ignore
  //     //   this[key] = object.constructor.call(object, payload[key]);
  //     //   return;
  //     // }
  //     // @ts-ignore
  //     this[key] = payload[key];
  //   });
  // }

  private getCodingProperties = () => {
    return get(this, '__proto__.constructor.CodingProperties', {});
  };
}

// export class User extends Codable {
//   username!: string;
//   name!: FullName;
// }

// class FullName extends Codable {
//   firstName!: string;
//   lastName!: string;

//   get fullname() {
//     return `${this.firstName} ${this.lastName}`;
//   }
// }

// FullName.CodingKeys = {
//   firstName: 'string',
//   lastName: 'string',
// };

// User.CodingKeys = {
//   username: 'string',
//   name: FullName,
// };
