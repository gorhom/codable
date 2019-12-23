# TypeScript Codable

another strict json parser inspired by [Swift Codable](https://developer.apple.com/documentation/swift/codable) ❤️

![Alt text](docs/cover.png 'Title')

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
  - [TODO] Date

## Installation

```bash
yarn add ts-codable
# or
npm install ts-codable
```

## Usage

```ts
class Post extends BaseCodable {
  title!: string;
  isActive?: boolean;
}

Post.CodingProperties = {
  title: types.string,
  isActive: {
    type: types.optional(types.boolean),
    key: 'active',
  },
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

const user: User = decode(User, {
  id: 123,
  username: 'Gorhom',
  posts: [
    {
      title: 'dummy post',
      active: true,
    },
    {
      title: 'deleted post',
      active: false,
    },
  ],
});
```

## TODO

- [x] Add [Swift Decodable](https://developer.apple.com/documentation/swift/decodable) functionality.
- [ ] Add [Swift Encodable](https://developer.apple.com/documentation/swift/encodable) functionality.
- [ ] Add `Date` type support.
- [ ] Write API docs.

## Built With

- [TSdx](https://github.com/palmerhq/tsdx) - Zero-config TypeScript package development.
- [TypeScript](https://github.com/Microsoft/TypeScript) - Strict syntactical superset of JavaScript.

## Author

- [Mo Gorhom](https://twitter.com/Gorhom)
