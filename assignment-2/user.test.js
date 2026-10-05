jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
  },
}));

const fs = require('fs');
const getUserData = require('./user');

describe('getUserData', () => {
  beforeEach(() => {
    fs.promises.readFile.mockClear();
  });

  test('returns the parsed user when readFile succeeds', async () => {
    const fakeUser = { id: '42', name: 'Ada Lovelace' };
    fs.promises.readFile.mockImplementation(() => Promise.resolve(JSON.stringify(fakeUser)));

    const user = await getUserData('42');

    expect(user).toEqual(fakeUser);
    expect(fs.promises.readFile).toHaveBeenCalledWith('./data/42.json', 'utf8');
    expect(fs.promises.readFile).toHaveBeenCalledTimes(1);
  });

  test('throws a generic error when readFile fails', () => {
    fs.promises.readFile.mockImplementation(() => Promise.reject(new Error('ENOENT: no such file')));

    return getUserData('missing')
      .then(() => {
        throw new Error('expected getUserData to throw');
      })
      .catch((error) => {
        expect(error.message).toMatch(/Error fetching user data/);
      });
  });

  test('throws a generic error when the file content is not valid JSON', () => {
    fs.promises.readFile.mockImplementation(() => Promise.resolve('not valid json'));

    return getUserData('42')
      .then(() => {
        throw new Error('expected getUserData to throw');
      })
      .catch((error) => {
        expect(error.message).toMatch(/Error fetching user data/);
      });
  });
});
