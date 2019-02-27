import * as storage from './storage';

jest.mock('../support/storage', () => {
  return (x: any) => x;
});

describe('storage', () => {
  test('persistent storage uses localStorage', () => {
    expect(storage.persistent).toBe(localStorage);
  });

  test('temporary storage uses sessionStorage', () => {
    expect(storage.temporary).toBe(sessionStorage);
  });
});
