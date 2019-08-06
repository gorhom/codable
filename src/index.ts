export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

type CodableType = 'string' | 'number' | 'array' | typeof Codable;

export class Codable {
  static CodingKeys: { [key: string]: CodableType };

  // @ts-ignore
  constructor(payload: object) {
    // @ts-ignore
    const keys = Object.keys(this.__proto__.constructor.CodingKeys);

    keys.forEach(key => {

      // @ts-ignore
      const type = this.__proto__.constructor.CodingKeys[key]

      // @ts-ignore
      if (payload[key] === undefined) {
        throw new Error(`missing '${key}'`);
      }

      if(type.prototype instanceof Codable) {
        // @ts-ignore
        const object = Object.create(type.prototype)
        // @ts-ignore
        this[key] = object.constructor.call(object, payload[key])
        return
      }
      // @ts-ignore
      this[key] = payload[key];
    });
  }
}

export class User extends Codable {
  username!: string;
  name!: FullName;
}

class FullName extends Codable {
  firstName!: string;
  lastName!: string;

  get fullname() {
    return `${this.firstName} ${this.lastName}`
  }
}

FullName.CodingKeys = {
  firstName: 'string',
  lastName: 'string'
}

User.CodingKeys = {
  username: 'string',
  name: FullName
};
