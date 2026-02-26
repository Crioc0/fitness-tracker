import { openDB } from 'idb';

const dbPromise = openDB('workout-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('workouts')) {
      db.createObjectStore('workouts');
    }

    if (!db.objectStoreNames.contains('syncQueue')) {
      db.createObjectStore('syncQueue', {
        keyPath: 'id',
        autoIncrement: true,
      });
    }
  },
});

export const idb = {
  async get<T>(key: string): Promise<T | undefined> {
    return (await dbPromise).get('workouts', key);
  },
  async set<T>(key: string, val: T) {
    return (await dbPromise).put('workouts', val, key);
  },
  async del(key: string) {
    return (await dbPromise).delete('workouts', key);
  },
  async clear() {
    return (await dbPromise).clear('workouts');
  },
  async keys() {
    return (await dbPromise).getAllKeys('workouts');
  },
};
