import createStorage from '../support/storage';

declare global {
  interface PersistentStorage {}

  interface TemporaryStorage {}
}

export const persistent = createStorage<PersistentStorage>(localStorage);

export const temporary = createStorage<TemporaryStorage>(sessionStorage);
