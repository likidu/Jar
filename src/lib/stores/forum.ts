import type { MenuItem, User } from '@/lib/models';
import { Storage } from '@/ui/services';
import { writable } from 'svelte/store';

export const menu = writable<MenuItem[]>([]);

/**
 * @summary Create store for forum and save them to LocalStorage
 * @param key
 * @param initStore
 * @returns Store<T>
 */
function createStore<T>(key: 'forum', initStore: T) {
  const { subscribe, update, set } = writable<T>(initStore);

  subscribe((val) => {
    Storage.set(key, val);
  });

  return {
    subscribe,
    update: function (data: Partial<T>) {
      update((previous) => ({ ...previous, ...data }));
    },
    reset: function () {
      set(null);
    },
  };
}

const storedForum = Storage.get<User>('forum');

export const forum = createStore<User>('forum', storedForum);
