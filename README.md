# Jest Testing Framework Assignment

Two small test suites written against the exact source functions given in the assignment: an async fetchData that wraps the native fetch API, and an async getUserData that reads a user's JSON file off disk.

## Running it

npm install, then npm test. Add -- --coverage to see the coverage table.

## Why assignment-1 is .mjs and assignment-2 is plain .js

fetchData uses export default (ES Modules). getUserData deliberately uses require/module.exports (CommonJS), per the assignment's own note. Jest's ESM support needs the --experimental-vm-modules flag and doesn't support jest.mock() cleanly under ESM, while mocking a built-in module like fs with jest.mock() works cleanly under CommonJS. Rather than force both files into one module system with Babel or jest.unstable_mockModule(), assignment-1's two files use the .mjs extension so Node treats them as ESM on their own, and assignment-2 stays plain .js (CommonJS by default, no top-level "type" field in package.json). One npm test script, with the experimental flag, covers both, since the flag is harmless for the CommonJS files.

## assignment-1/api.mjs

fetchData is tested with jest.spyOn(global, 'fetch'), using mockImplementation to control what the spy resolves or rejects with:

- A successful response: the spy resolves to an object with ok: true and a json() method, and the test asserts fetchData resolves to that data, and that fetch was called with the given url exactly once.
- An HTTP error response: the spy resolves to ok: false with a status, and the test asserts the returned value is an Error whose message matches the HTTP error text. fetchData catches internally and returns the error rather than throwing it, so the assertions are on the resolved value, not a rejection.
- A network failure: the spy rejects outright, and the test asserts the same way, that fetchData returns an Error with the matching message.

afterEach restores the spy so each test starts clean.

## assignment-2/user.js

fs is mocked with the factory form of jest.mock(), replacing fs.promises.readFile with a plain jest.fn() so no real file is ever touched.

- A successful read: readFile resolves to a canned JSON string, and the test asserts getUserData resolves to the parsed object, and that readFile was called with the exact expected file path and encoding.
- A failed read, and a read that returns invalid JSON: both exercise the catch block, which always throws the same generic "Error fetching user data" message. These tests return a promise chain (getUserData(...).then(...).catch(...)) rather than using the rejects matcher, since that matcher isn't covered in the training material - the .then() branch throws a sentinel error if getUserData unexpectedly resolves, so the test can't pass without the rejection actually happening.

beforeEach clears the mock so call-count assertions don't carry over between tests.

## Jest concepts used

describe/test grouping, beforeEach/afterEach, jest.spyOn, jest.mock() with a factory function, jest.fn(), mockImplementation, mockClear/mockRestore, and the matchers toEqual, toBeInstanceOf, toMatch, toHaveBeenCalledWith, and toHaveBeenCalledTimes.
