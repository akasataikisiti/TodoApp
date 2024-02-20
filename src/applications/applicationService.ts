import { v4 as uuidv4, v4 } from "uuid";
import { Repository } from "../repositories/repository";
import { BgColor } from "../types/bgColor";
import { Board } from "../types/board";
import { List } from "../types/lists";

// const migrateState = (boards: Board[]): Board[] => {
//   return boards;
// };

export class ApplicationService {
  repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  // Util
  clear() {
    this.repository.remove();
    return [];
  }

  load() {
    const result = this.repository.get();
    return result;
  }

  set(boards: Board[]) {
    this.repository.set(boards);
  }
  // Board
  createBoard(
    boards: Board[],
    title: string,
    listTitles: string[],
    bgColor: BgColor | null
  ) {
    const lists: List[] = listTitles.map((title) => {
      return { id: uuidv4(), title, cards: [] };
    });
    const newBoard: Board = {
      id: v4(),
      title,
      lists,
      bgColor
    };
    const updated = [newBoard, ...boards];
    this.repository.set(updated);
    return updated;
  }

  updateBoardTitle(boards: Board[], title: string, boardId: string) {
    const updated = boards.map((board) => {
      return board.id === boardId ? { ...board, title } : board;
    });
    this.repository.set(updated);
    return updated;
  }
  // List
  createList(state: Board[], listTitle: string, boardId: string): Board[] {
    const newList: List = {
      id: v4(),
      title: listTitle,
      cards: []
    };
    const updated = state.map((board) => {
      return board.id === boardId
        ? { ...board, lists: [...board.lists, newList] }
        : board;
    });
    this.repository.set(updated);
    return updated;
  }
}
