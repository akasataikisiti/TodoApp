import { Board } from "./types/board";
import { List } from "./types/lists";

export const filterBoardsByName = (query: string, boards: Board[]): Board[] => {
  return boards.filter((board) =>
    board.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterListsByCardName = (query: string, lists: List[]): List[] => {
  return lists.map((list) => {
    return {
      ...list,
      cards: list.cards.filter((card) =>
        card.title.toLowerCase().includes(query.toLowerCase())
      )
    };
  });
};
