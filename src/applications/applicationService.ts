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

  moveBoard(
    boards: Board[],
    draggingBoardId: string,
    dropTargetBoardId: string
  ): Board[] {
    const draggingBoard = boards.find((board) => board.id === draggingBoardId);
    const dropTargetBoard = boards.find(
      (board) => board.id === dropTargetBoardId
    );
    if (!draggingBoard || !dropTargetBoard) return boards;
    const dropTargetIndex = boards.findIndex(
      (board) => board.id === dropTargetBoardId
    );
    const draggingIndex = boards.findIndex(
      (board) => board.id === draggingBoardId
    );
    // if (draggingIndex < 0 || dropTargetIndex < 0) return boards;
    const updated = boards.filter(
      (board) => board.id !== draggingBoardId && board.id !== dropTargetBoardId
    );
    if (draggingIndex < dropTargetIndex) {
      updated.splice(draggingIndex, 0, dropTargetBoard);
      updated.splice(dropTargetIndex, 0, draggingBoard);
    } else {
      updated.splice(dropTargetIndex, 0, draggingBoard);
      updated.splice(draggingIndex, 0, dropTargetBoard);
    }

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

  moveList(
    boards: Board[],
    BoardId: string,
    draggingListId: string,
    dropTargetListId: string
  ): Board[] {
    const board = boards.find((board) => board.id === BoardId);
    if (!board) return boards;
    const draggingList = board.lists.find((list) => list.id === draggingListId);
    const dropTargetList = board.lists.find(
      (list) => list.id === dropTargetListId
    );
    if (!draggingList || !dropTargetList) return boards;
    const dropTargetIndex = board?.lists.findIndex(
      (list) => list.id === dropTargetListId
    );
    const draggingIndex = board?.lists.findIndex(
      (list) => list.id === draggingListId
    );
    // if (draggingIndex < 0 || dropTargetIndex < 0) return boards;
    const update_lists = board.lists.filter(
      (list) => list.id !== draggingListId && list.id !== dropTargetListId
    );
    if (draggingListId < dropTargetListId) {
      update_lists.splice(draggingIndex, 0, dropTargetList);
      update_lists.splice(dropTargetIndex, 0, draggingList);
    } else {
      update_lists.splice(dropTargetIndex, 0, draggingList);
      update_lists.splice(draggingIndex, 0, dropTargetList);
    }

    const updated = boards.map((board) => {
      return board.id === BoardId ? { ...board, lists: update_lists } : board;
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
  moveCard = (
    boards: Board[],
    boardId: string,
    listId: string,
    draggingCardId: string,
    dropTargetCardId: string
  ): Board[] => {
    const board = boards.find((board) => board.id === boardId);
    if (!board) return boards;
    const list = board.lists.find((list) => list.id === listId);
    if (!list) return boards;
    const draggingCard = list.cards.find((card) => card.id === draggingCardId);
    const dropTargetCard = list.cards.find(
      (card) => card.id === dropTargetCardId
    );
    if (!draggingCard || !dropTargetCard) return boards;
    const dropTargetIndex = list.cards.findIndex(
      (card) => card.id === dropTargetCardId
    );
    const draggingIndex = list.cards.findIndex(
      (card) => card.id === draggingCardId
    );
    // if (draggingIndex < 0 || dropTargetIndex < 0) return boards;
    const update_cards = list.cards.filter(
      (card) => card.id !== draggingCardId && card.id !== dropTargetCardId
    );
    if (draggingIndex < dropTargetIndex) {
      update_cards.splice(draggingIndex, 0, dropTargetCard);
      update_cards.splice(dropTargetIndex, 0, draggingCard);
    } else {
      update_cards.splice(dropTargetIndex, 0, draggingCard);
      update_cards.splice(draggingIndex, 0, dropTargetCard);
    }

    const updated = boards.map((board) => {
      return board.id === boardId
        ? {
            ...board,
            lists: board.lists.map((list) => {
              return list.id === listId
                ? { ...list, cards: update_cards }
                : list;
            })
          }
        : board;
    });

    this.repository.set(updated);
    return updated;
  };
}
