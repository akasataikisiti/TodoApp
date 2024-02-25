import { v4 as uuidv4, v4 } from "uuid";
import { Repository } from "../repositories/repository";
import { BgColor } from "../types/bgColor";
import { Board } from "../types/board";
import { List } from "../types/lists";
import { Card } from "../types/card";

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

  import(boards: Board[], importBoards: Board[]) {
    const updated = [...importBoards, ...boards];
    this.repository.set(updated);
    return updated;
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

  updateBoardBgColor(
    boards: Board[],
    bgColor: BgColor | null,
    boardId: string
  ) {
    const updated = boards.map((board) => {
      return board.id === boardId ? { ...board, bgColor } : board;
    });
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

  deleteBoard(boards: Board[], boardId: string) {
    const updated = boards.filter((board) => board.id !== boardId);
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
  updateListTitle(
    state: Board[],
    listTitle: string,
    boardId: string,
    listId: string
  ): Board[] {
    const updated = state.map((board) => {
      return board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((list) => {
              return list.id === listId ? { ...list, title: listTitle } : list;
            })
          }
        : board;
    });
    this.repository.set(updated);
    return updated;
  }

  deleteList(state: Board[], boardId: string, listId: string): Board[] {
    const updated = state.map((board) => {
      return board.id === boardId
        ? {
            ...board,
            lists: board.lists.filter((list) => list.id !== listId)
          }
        : board;
    });
    this.repository.set(updated);
    return updated;
  }

  // Card
  createCard(
    state: Board[],
    cardTitle: string,
    boardId: string,
    listId: string
  ): Board[] {
    const now = new Date();
    const newCard: Card = {
      id: v4(),
      title: cardTitle,
      description: "",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
    const updated = state.map((board) => {
      return board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((list) => {
              return list.id === listId
                ? { ...list, cards: [...list.cards, newCard] }
                : list;
            })
          }
        : board;
    });
    this.repository.set(updated);
    return updated;
  }
  updateCardTitle = (
    state: Board[],
    boardId: string,
    listId: string,
    cardId: string,
    cardTitle: string
  ): Board[] => {
    const now = new Date().toISOString();
    const updated = state.map((board) => {
      return board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((list) => {
              return list.id === listId
                ? {
                    ...list,
                    cards: list.cards.map((card) => {
                      return card.id === cardId
                        ? {
                            ...card,
                            title: cardTitle,
                            updatedAt: now
                          }
                        : card;
                    })
                  }
                : list;
            })
          }
        : board;
    });
    this.repository.set(updated);
    return updated;
  };
  deleteCard = (
    state: Board[],
    cardId: string,
    boardId: string,
    listId: string
  ): Board[] => {
    const updated = state.map((board) => {
      return board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((list) => {
              return list.id === listId
                ? {
                    ...list,
                    cards: list.cards.filter((card) => card.id !== cardId)
                  }
                : list;
            })
          }
        : board;
    });
    this.repository.set(updated);
    return updated;
  };

  deleteAllCards = (
    state: Board[],
    boardId: string,
    listId: string
  ): Board[] => {
    const updated = state.map((board) => {
      return board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((list) => {
              return list.id === listId ? { ...list, cards: [] } : list;
            })
          }
        : board;
    });
    this.repository.set(updated);
    return updated;
  };
}
