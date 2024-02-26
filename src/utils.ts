import { Board } from "./types/board";
import { List } from "./types/lists";
import { Display } from "./types/display";

export const applyDisplay = (display: Display) => {
  if (display === "dark") {
    document.firstElementChild?.classList.add("dark");
  } else {
    document.firstElementChild?.classList.remove("dark");
  }
};

export const getDisplay = (): Display => {
  const key = "display";
  const display = localStorage.getItem(key);
  if (display) {
    return (display as Display) || "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const setDisplay = (display: Display) => {
  const key = "display";
  localStorage.setItem(key, display);
};

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
