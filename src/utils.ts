import { Board } from "./types/board";

export const filterBoardsByName = (boards: Board[], query: string): Board[] => {
  return boards.filter((board) =>
    board.title.toLowerCase().includes(query.toLowerCase())
  );
};
