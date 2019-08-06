import { sum, User } from '../src';

describe('blah', () => {
  it('works', () => {
    expect(sum(1, 1)).toEqual(2);
  });

  const user = new User({
    username: 'Gorhom',
    name: {
      firstName: 'Mo',
      lastName: 'Gorhom',
    },
  });

  console.debug(user.name.fullname);
});
