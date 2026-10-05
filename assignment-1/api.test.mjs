import { jest } from '@jest/globals';
import fetchData from './api.mjs';

describe('fetchData', () => {
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  test('returns the parsed JSON when the response is ok', async () => {
    const fakeData = { id: 1, name: 'Wireless Mouse' };
    fetchSpy.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeData),
      })
    );

    const data = await fetchData('https://example.com/products/1');

    expect(data).toEqual(fakeData);
    expect(fetchSpy).toHaveBeenCalledWith('https://example.com/products/1');
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test('returns an Error when the response is not ok', async () => {
    fetchSpy.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    const result = await fetchData('https://example.com/products/999');

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toMatch(/HTTP error! Status: 404/);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  test('returns an Error when fetch rejects with a network failure', async () => {
    fetchSpy.mockImplementation(() => Promise.reject(new Error('Network failure')));

    const result = await fetchData('https://example.com/products/1');

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toMatch(/Network failure/);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
