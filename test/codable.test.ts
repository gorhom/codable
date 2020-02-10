import { types, BaseCodable, decode } from '../src/internal';
import { fixturePayload } from './fixtures';

describe('Decoder', () => {
  describe('Decode String', () => {
    it('decode property with string type', () => {
      class Post extends BaseCodable {
        title!: string;
      }

      Post.CodingProperties = {
        title: types.string,
      };

      const post = decode(Post, fixturePayload);
      expect(post.title).toBe(fixturePayload.title);
    });

    it('decode property with string type and custom key', () => {
      class Post extends BaseCodable {
        postTitle!: string;
      }

      Post.CodingProperties = {
        postTitle: {
          type: types.string,
          key: 'title',
        },
      };

      const post = decode(Post, fixturePayload);
      expect(post.postTitle).toBe(fixturePayload.title);
    });

    it('decode property with optional string type', () => {
      class Post extends BaseCodable {
        title?: string;
      }

      Post.CodingProperties = {
        title: {
          type: types.optional(types.string),
          key: 'non-exist-key',
        },
      };

      const post = decode(Post, fixturePayload);
      expect(post.title).toBe(undefined);
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class Post extends BaseCodable {
        title!: string;
      }

      Post.CodingProperties = {
        title: {
          type: types.string,
          key: 'non-exist-key',
        },
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });

    it('throws error when decode a wrong type', () => {
      class Post extends BaseCodable {
        id!: string;
      }

      Post.CodingProperties = {
        id: types.string,
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Value found with a wrong type\. key: 'id', expected type: 'string', found type: 'number'/
      );
    });

    it('throws error when decode an optional wrong type', () => {
      class Post extends BaseCodable {
        id!: string;
      }

      Post.CodingProperties = {
        id: types.optional(types.string),
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Value found with a wrong type. key: 'id', expected type: 'string', found type: 'number'/
      );
    });
  });

  describe('Decode Number', () => {
    it('decode property with number type', () => {
      class Post extends BaseCodable {
        id!: string;
      }

      Post.CodingProperties = {
        id: types.number,
      };

      const post = decode(Post, fixturePayload);
      expect(post.id).toBe(fixturePayload.id);
    });

    it('decode property with number type and custom key', () => {
      class Post extends BaseCodable {
        postId!: string;
      }

      Post.CodingProperties = {
        postId: {
          key: 'id',
          type: types.number,
        },
      };

      const post = decode(Post, fixturePayload);
      expect(post.postId).toBe(fixturePayload.id);
    });

    it('decode property with optional number type', () => {
      class Post extends BaseCodable {
        id?: number;
      }

      Post.CodingProperties = {
        id: {
          type: types.optional(types.number),
          key: 'non-exist-key',
        },
      };

      const post = decode(Post, fixturePayload);
      expect(post.id).toBe(undefined);
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class Post extends BaseCodable {
        id!: string;
      }

      Post.CodingProperties = {
        id: {
          type: types.number,
          key: 'non-exist-key',
        },
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });

    it('throws error when decode a wrong type', () => {
      class Post extends BaseCodable {
        title!: number;
      }

      Post.CodingProperties = {
        title: types.number,
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Value found with a wrong type. key: 'title', expected type: 'number', found type: 'string'/
      );
    });

    it('throws error when decode an optional wrong type', () => {
      class Post extends BaseCodable {
        title!: number;
      }

      Post.CodingProperties = {
        title: types.optional(types.number),
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Value found with a wrong type. key: 'title', expected type: 'number', found type: 'string'/
      );
    });
  });

  describe('Decode Boolean', () => {
    it('decode property with boolean type', () => {
      class Post extends BaseCodable {
        active!: boolean;
      }

      Post.CodingProperties = {
        active: types.boolean,
      };

      const post = decode(Post, fixturePayload);
      expect(post.active).toBe(fixturePayload.active);
    });

    it('decode property with boolean type and custom key', () => {
      class Post extends BaseCodable {
        isActive!: boolean;
      }

      Post.CodingProperties = {
        isActive: {
          type: types.boolean,
          key: 'active',
        },
      };

      const post = decode(Post, fixturePayload);
      expect(post.isActive).toBe(fixturePayload.active);
    });

    it('decode property with optional boolean type', () => {
      class Post extends BaseCodable {
        active?: boolean;
      }

      Post.CodingProperties = {
        active: {
          type: types.optional(types.boolean),
          key: 'non-exist-key',
        },
      };

      const post = decode(Post, fixturePayload);
      expect(post.active).toBe(undefined);
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class Post extends BaseCodable {
        active!: boolean;
      }

      Post.CodingProperties = {
        active: {
          type: types.boolean,
          key: 'non-exist-key',
        },
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });

    it('throws error when decode a wrong type', () => {
      class Post extends BaseCodable {
        title!: boolean;
      }

      Post.CodingProperties = {
        title: types.boolean,
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Value found with a wrong type. key: 'title', expected type: 'boolean', found type: 'string'/
      );
    });

    it('throws error when decode an optional wrong type', () => {
      class Post extends BaseCodable {
        title!: boolean;
      }

      Post.CodingProperties = {
        title: types.optional(types.boolean),
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Value found with a wrong type. key: 'title', expected type: 'boolean', found type: 'string'/
      );
    });
  });

  describe('Decode Codable', () => {
    it('decode property with Codable type', () => {
      class User extends BaseCodable {
        id!: number;
        username!: string;
      }

      User.CodingProperties = {
        id: types.number,
        username: types.string,
      };

      class Post extends BaseCodable {
        title!: string;
        user!: User;
      }

      Post.CodingProperties = {
        title: types.string,
        user: User,
      };

      const post = decode(Post, fixturePayload);
      expect(post.user.id).toBe(fixturePayload.user.id);
    });

    it('decode property with Codable type and custom key', () => {
      class User extends BaseCodable {
        id!: number;
        username!: string;
      }

      User.CodingProperties = {
        id: types.number,
        username: types.string,
      };

      class Post extends BaseCodable {
        title!: string;
        owner!: User;
      }

      Post.CodingProperties = {
        title: types.string,
        owner: {
          key: 'user',
          type: User,
        },
      };

      const post = decode(Post, fixturePayload);
      expect(post.owner.id).toBe(fixturePayload.user.id);
    });

    it('decode property with optional Codable type', () => {
      class User extends BaseCodable {
        id!: number;
        username!: string;
      }

      User.CodingProperties = {
        id: types.number,
        username: types.string,
      };

      class Post extends BaseCodable {
        title!: string;
        user?: User;
      }

      Post.CodingProperties = {
        title: types.string,
        user: {
          type: types.optional(User),
          key: 'non-exist-key',
        },
      };

      const post = decode(Post, fixturePayload);
      expect(post.user).toBe(undefined);
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class User extends BaseCodable {
        id!: number;
        username!: string;
      }

      User.CodingProperties = {
        id: types.number,
        username: types.string,
      };

      class Post extends BaseCodable {
        user!: User;
      }

      Post.CodingProperties = {
        user: {
          type: User,
          key: 'non-exist-key',
        },
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });
  });

  describe('Decode Array', () => {
    it('decode property with array of string type', () => {
      class Post extends BaseCodable {
        tags!: string[];
      }

      Post.CodingProperties = {
        tags: types.array(types.string),
      };

      const post = decode(Post, fixturePayload);
      expect(post.tags).toBe(fixturePayload.tags);
    });

    it('decode property with array of number type', () => {
      class Post extends BaseCodable {
        categories!: number[];
      }

      Post.CodingProperties = {
        categories: types.array(types.number),
      };

      const post = decode(Post, fixturePayload);
      expect(post.categories).toBe(fixturePayload.categories);
    });

    it('decode property with array of Codable type', () => {
      class User extends BaseCodable {
        private _id!: number;
        private _username!: string;

        get id() {
          return this._id;
        }

        get username() {
          return this._username;
        }
      }

      User.CodingProperties = {
        _id: {
          type: types.number,
          key: 'id',
        },
        _username: {
          type: types.string,
          key: 'username',
        },
      };

      class Comment extends BaseCodable {
        id!: number;
        body!: string;
        user!: User;
      }

      Comment.CodingProperties = {
        id: types.number,
        body: types.string,
        user: User,
      };

      class Post extends BaseCodable {
        comments!: Comment[];
      }

      Post.CodingProperties = {
        comments: types.array(Comment),
      };

      const post = decode(Post, fixturePayload);

      expect(post.comments.length).toBe(fixturePayload.comments.length);
      expect(post.comments[0].id).toBe(fixturePayload.comments[0].id);

      expect(post.comments[0].user.id).toBe(fixturePayload.comments[0].user.id);
      expect(post.comments[0].user.username).toBe(
        fixturePayload.comments[0].user.username
      );
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class Post extends BaseCodable {
        tags!: string[];
      }

      Post.CodingProperties = {
        tags: {
          type: types.array(types.string),
          key: 'non-exist-key',
        },
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });

    it('throws error when decode a wrong type', () => {
      class Post extends BaseCodable {
        tags!: number[];
      }

      Post.CodingProperties = {
        tags: types.number,
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Value found with a wrong type. key: 'tags', expected type: 'number', found type: 'object'/
      );
    });

    it('throws error when decode an optional wrong type', () => {
      class Post extends BaseCodable {
        tags!: number[];
      }

      Post.CodingProperties = {
        tags: types.optional(types.number),
      };

      expect(() => decode(Post, fixturePayload)).toThrowError(
        /Value found with a wrong type. key: 'tags', expected type: 'number', found type: 'object'/
      );
    });
  });
});
