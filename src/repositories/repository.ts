import { Board } from "../types/board";
const LOCAL_STORAGE_KEY = "MY_TODOS";
export interface Repository {
  set: (state: Board[]) => void;
  get: () => Board[];
  remove: () => void;
}
export class RepositoryLocalFile implements Repository {
  set(state: Board[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    return;
  }
  get(): Board[] {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (value) {
      return JSON.parse(value);
    }
    return [];
  }
  remove() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return;
  }
}
