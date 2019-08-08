import { Codable, types } from '../src/internal';
import { fixturePayload } from './fixtures';

describe('Decode', () => {
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
});
