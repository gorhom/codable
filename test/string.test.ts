import { Codable } from '../src';
import { fixturePayload } from './fixtures';

describe('Decode Strings', () => {
  it('decode string with type', () => {
    class Post extends Codable {
      title!: string;
    }

    Post.CodingProperties = {
      title: String,
    };

    const post = new Post(fixturePayload);

    expect(post.title).toBe(fixturePayload.title);
  });

  it('decode string with custom key', () => {
    class Post extends Codable {
      postTitle!: string;
    }

    Post.CodingProperties = {
      postTitle: {
        key: 'title',
        type: String,
      },
    };

    const post = new Post(fixturePayload);

    expect(post.postTitle).toBe(fixturePayload.title);
  });

  it('decode an optional string', () => {
    class Post extends Codable {
      shortTitle?: string;
    }

    Post.CodingProperties = {
      shortTitle: {
        key: 'shortTitle',
        type: String,
        optional: true,
      },
    };

    const post = new Post(fixturePayload);

    expect(post.shortTitle).toBe(undefined);
  });

  it('throws error when decode a non optioanl string', () => {
    class Post extends Codable {
      title!: string;
    }

    Post.CodingProperties = {
      title: {
        key: 'non-exsist-key',
        type: String,
      },
    };

    expect(() => new Post(fixturePayload)).toThrowError(
      /Missing a non optional property/
    );
  });

  it('throws error when decode a wrong type', () => {
    class Post extends Codable {
      title!: string;
    }

    Post.CodingProperties = {
      title: {
        type: Number,
      },
    };

    expect(() => new Post(fixturePayload)).toThrowError(/Expected type to be/);
  });
});
