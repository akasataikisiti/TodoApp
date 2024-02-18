import { Repository } from "../repositories/repository";
import { Board } from "../types/board";

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

  updateBoardTitle(boards: Board[], title: string, boardId: string) {
    const updated = boards.map((board) => {
      return board.id === boardId ? { ...board, title } : board;
    });
    this.repository.set(updated);
    return updated;
  }
}
