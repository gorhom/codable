import { Codable } from '../src';
import { fixturePayload } from './fixtures';

describe('Decode Numbers', () => {
  it('decode number with type', () => {
    class Post extends Codable {
      id!: number;
    }

    Post.CodingProperties = {
      id: Number,
    };

    const post = new Post(fixturePayload);

    expect(post.id).toBe(fixturePayload.id);
  });

  it('decode number with custom key', () => {
    class Post extends Codable {
      postId!: string;
    }

    Post.CodingProperties = {
      postId: {
        key: 'id',
        type: Number,
      },
    };

    const post = new Post(fixturePayload);

    expect(post.postId).toBe(fixturePayload.id);
  });

  it('decode an optional number', () => {
    class Post extends Codable {
      shortId?: string;
    }

    Post.CodingProperties = {
      shortId: {
        key: 'shortTitle',
        type: Number,
        optional: true,
      },
    };

    const post = new Post(fixturePayload);

    expect(post.shortId).toBe(undefined);
  });

  it('throws error when decode a non optioanl number', () => {
    class Post extends Codable {
      id!: number;
    }

    Post.CodingProperties = {
      title: {
        key: 'non-exsist-key',
        type: Number,
      },
    };

    expect(() => new Post(fixturePayload)).toThrowError(
      /Missing a non optional property/
    );
  });

  it('throws error when decode a wrong type', () => {
    class Post extends Codable {
      id!: number;
    }

    Post.CodingProperties = {
      id: {
        type: String,
      },
    };

    expect(() => new Post(fixturePayload)).toThrowError(/Expected type to be/);
  });
});
