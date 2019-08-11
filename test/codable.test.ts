import { Codable, types } from '../src/internal';
import { fixturePayload } from './fixtures';

describe('Decoder', () => {
  describe('Decode String', () => {
    it('decode property with string type', () => {
      class Post extends Codable {
        title!: string;
      }

      Post.CodingProperties = {
        title: types.string,
      };

      const post = new Post(fixturePayload);
      expect(post.title).toBe(fixturePayload.title);
    });

    it('decode property with string type and custom key', () => {
      class Post extends Codable {
        postTitle!: string;
      }

      Post.CodingProperties = {
        postTitle: {
          type: types.string,
          key: 'title',
        },
      };

      const post = new Post(fixturePayload);
      expect(post.postTitle).toBe(fixturePayload.title);
    });

    it('decode property with optional string type', () => {
      class Post extends Codable {
        title?: string;
      }

      Post.CodingProperties = {
        title: {
          type: types.optional(types.string),
          key: 'non-exist-key',
        },
      };

      const post = new Post(fixturePayload);
      expect(post.title).toBe(undefined);
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class Post extends Codable {
        title!: string;
      }

      Post.CodingProperties = {
        title: {
          type: types.string,
          key: 'non-exist-key',
        },
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });

    it('throws error when decode a wrong type', () => {
      class Post extends Codable {
        id!: string;
      }

      Post.CodingProperties = {
        id: types.string,
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'string'/
      );
    });

    it('throws error when decode an optional wrong type', () => {
      class Post extends Codable {
        id!: string;
      }

      Post.CodingProperties = {
        id: types.optional(types.string),
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'string'/
      );
    });
  });

  describe('Decode Number', () => {
    it('decode property with number type', () => {
      class Post extends Codable {
        id!: string;
      }

      Post.CodingProperties = {
        id: types.number,
      };

      const post = new Post(fixturePayload);
      expect(post.id).toBe(fixturePayload.id);
    });

    it('decode property with number type and custom key', () => {
      class Post extends Codable {
        postId!: string;
      }

      Post.CodingProperties = {
        postId: {
          key: 'id',
          type: types.number,
        },
      };

      const post = new Post(fixturePayload);
      expect(post.postId).toBe(fixturePayload.id);
    });

    it('decode property with optional number type', () => {
      class Post extends Codable {
        id?: number;
      }

      Post.CodingProperties = {
        id: {
          type: types.optional(types.number),
          key: 'non-exist-key',
        },
      };

      const post = new Post(fixturePayload);
      expect(post.id).toBe(undefined);
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class Post extends Codable {
        id!: string;
      }

      Post.CodingProperties = {
        id: {
          type: types.number,
          key: 'non-exist-key',
        },
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });

    it('throws error when decode a wrong type', () => {
      class Post extends Codable {
        id!: string;
      }

      Post.CodingProperties = {
        id: types.string,
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'string'/
      );
    });

    it('throws error when decode an optional wrong type', () => {
      class Post extends Codable {
        id!: string;
      }

      Post.CodingProperties = {
        id: types.optional(types.string),
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'string'/
      );
    });
  });

  describe('Decode Boolean', () => {
    it('decode property with boolean type', () => {
      class Post extends Codable {
        active!: boolean;
      }

      Post.CodingProperties = {
        active: types.boolean,
      };

      const post = new Post(fixturePayload);
      expect(post.active).toBe(fixturePayload.active);
    });

    it('decode property with boolean type and custom key', () => {
      class Post extends Codable {
        isActive!: boolean;
      }

      Post.CodingProperties = {
        isActive: {
          type: types.boolean,
          key: 'active',
        },
      };

      const post = new Post(fixturePayload);
      expect(post.isActive).toBe(fixturePayload.active);
    });

    it('decode property with optional boolean type', () => {
      class Post extends Codable {
        active?: boolean;
      }

      Post.CodingProperties = {
        active: {
          type: types.optional(types.boolean),
          key: 'non-exist-key',
        },
      };

      const post = new Post(fixturePayload);
      expect(post.active).toBe(undefined);
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class Post extends Codable {
        active!: boolean;
      }

      Post.CodingProperties = {
        active: {
          type: types.boolean,
          key: 'non-exist-key',
        },
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });

    it('throws error when decode a wrong type', () => {
      class Post extends Codable {
        active!: number;
      }

      Post.CodingProperties = {
        active: types.number,
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'number'/
      );
    });

    it('throws error when decode an optional wrong type', () => {
      class Post extends Codable {
        active!: number;
      }

      Post.CodingProperties = {
        active: types.optional(types.number),
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'number'/
      );
    });
  });

  describe('Decode Codable', () => {
    it('decode property with Codable type', () => {
      class User extends Codable {
        id!: number;
        username!: string;
      }

      User.CodingProperties = {
        id: types.number,
        username: types.string,
      };

      class Post extends Codable {
        title!: string;
        user!: User;
      }

      Post.CodingProperties = {
        title: types.string,
        user: User,
      };

      const post = new Post(fixturePayload);
      expect(post.user.id).toBe(fixturePayload.user.id);
    });

    it('decode property with Codable type and custom key', () => {
      class User extends Codable {
        id!: number;
        username!: string;
      }

      User.CodingProperties = {
        id: types.number,
        username: types.string,
      };

      class Post extends Codable {
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

      const post = new Post(fixturePayload);
      expect(post.owner.id).toBe(fixturePayload.user.id);
    });

    it('decode property with optional Codable type', () => {
      class User extends Codable {
        id!: number;
        username!: string;
      }

      User.CodingProperties = {
        id: types.number,
        username: types.string,
      };

      class Post extends Codable {
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

      const post = new Post(fixturePayload);
      expect(post.user).toBe(undefined);
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class User extends Codable {
        id!: number;
        username!: string;
      }

      User.CodingProperties = {
        id: types.number,
        username: types.string,
      };

      class Post extends Codable {
        user!: User;
      }

      Post.CodingProperties = {
        user: {
          type: User,
          key: 'non-exist-key',
        },
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });

    it('throws error when decode a wrong type', () => {
      class Post extends Codable {
        user!: string;
      }

      Post.CodingProperties = {
        user: types.string,
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'string'/
      );
    });

    it('throws error when decode an optional wrong type', () => {
      class Post extends Codable {
        user?: string;
      }

      Post.CodingProperties = {
        user: types.optional(types.string),
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'string'/
      );
    });
  });

  describe('Decode Array', () => {
    it('decode property with array of string type', () => {
      class Post extends Codable {
        tags!: string[];
      }

      Post.CodingProperties = {
        tags: types.array(types.string),
      };

      const post = new Post(fixturePayload);
      expect(post.tags).toBe(fixturePayload.tags);
    });

    it('decode property with array of number type', () => {
      class Post extends Codable {
        categories!: number[];
      }

      Post.CodingProperties = {
        categories: types.array(types.number),
      };

      const post = new Post(fixturePayload);
      expect(post.categories).toBe(fixturePayload.categories);
    });

    it('decode property with array of Codable type', () => {
      class User extends Codable {
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

      class Comment extends Codable {
        id!: number;
        body!: string;
        user!: User;
      }

      Comment.CodingProperties = {
        id: types.number,
        body: types.string,
        user: User,
      };

      class Post extends Codable {
        comments!: Comment[];
      }

      Post.CodingProperties = {
        comments: types.array(Comment),
      };

      const post = new Post(fixturePayload);

      expect(post.comments.length).toBe(fixturePayload.comments.length);
      expect(post.comments[0].id).toBe(fixturePayload.comments[0].id);

      expect(post.comments[0].user.id).toBe(fixturePayload.comments[0].user.id);
      expect(post.comments[0].user.username).toBe(
        fixturePayload.comments[0].user.username
      );
    });

    it('throws error when decode a missing value a non-optional property', () => {
      class Post extends Codable {
        tags!: string[];
      }

      Post.CodingProperties = {
        tags: {
          type: types.array(types.string),
          key: 'non-exist-key',
        },
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Missing value for a non optional property/
      );
    });

    it('throws error when decode a wrong type', () => {
      class Post extends Codable {
        tags!: number[];
      }

      Post.CodingProperties = {
        tags: types.number,
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'number'/
      );
    });

    it('throws error when decode an optional wrong type', () => {
      class Post extends Codable {
        tags!: number[];
      }

      Post.CodingProperties = {
        tags: types.optional(types.number),
      };

      expect(() => new Post(fixturePayload)).toThrowError(
        /Expected type to be 'number'/
      );
    });
  });
});
