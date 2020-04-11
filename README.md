# Codable [![npm](https://img.shields.io/npm/v/@gorhom/codable)](https://www.npmjs.com/package/@gorhom/codable) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/@gorhom/codable)](https://www.npmjs.com/package/@gorhom/codable) [![npm](https://badgen.net/npm/dependents/@gorhom/codable)](https://www.npmjs.com/package/@gorhom/codable)

A strict json parser inspired by [Swift Codable](https://developer.apple.com/documentation/swift/codable/) ❤️

![Alt text](docs/cover.png 'Cover')

## Features

Works almost same as [Swift Codable](https://developer.apple.com/documentation/swift/codable), but with some extra implementation to fit `TypeScript` / `JavaScript` environment.

- Decodes `JSON` payload with pre-defined scheme.
  - Custom keys parsing.
  - Strict types checking.
  - Nested `Codable` parsing.

## Supported Types

Types design was inspired by [MobX State Tree](https://github.com/mobxjs/mobx-state-tree#types-overview) ❤️

- Primitives
  - String
  - Number
  - Boolean
- Complex
  - Codable
  - Optional
  - Array
  - Date

## Installation

```bash
yarn add @gorhom/codable
# or
npm install @gorhom/codable
```

## Usage

```ts
import { BaseCodable, types, decode, encode } from '@gorhom/codable';
import dayjs from 'dayjs';

class Post extends BaseCodable {
  title!: string;
  isActive?: boolean;
  date!: Date;
}

Post.CodingProperties = {
  title: types.string,
  isActive: {
    type: types.optional(types.boolean),
    key: 'active',
  },
  date: types.date(dayjs),
};

class User extends BaseCodable {
  id!: number;
  username!: string;
  posts!: Post[];
}

User.CodingProperties = {
  id: types.number,
  username: types.string,
  posts: types.array(Post),
};

const jsonPayload = {
  id: 123,
  username: 'Gorhom',
  posts: [
    {
      title: 'dummy post',
      active: true,
      date: '2020-02-15T16:00:00.000Z',
    },
    {
      title: 'deleted post',
      active: false,
      date: '2020-02-10T16:00:00.000Z',
    },
  ],
};

const user: User = decode(User, jsonPayload);

// now encode it back 🙈

const userJson = encode(user)
```

## TODO

- [x] Add [Swift Decodable](https://developer.apple.com/documentation/swift/decodable) functionality.
- [x] Add [Swift Encodable](https://developer.apple.com/documentation/swift/encodable) functionality.
- [ ] Write API docs.

## Built With

- [TSdx](https://github.com/jaredpalmer/tsdx)
- [TypeScript](https://github.com/Microsoft/TypeScript)

## Author

- [Mo Gorhom](https://twitter.com/gorhom)
