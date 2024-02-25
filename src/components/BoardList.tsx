import { useRef, useState } from "preact/hooks";
import { Board } from "../types/board";
import BoardItem from "./BoardItem";
import { JSX } from "preact/jsx-runtime";
import { filterBoardsByName } from "../utils";

export default function BoardList({
  boards,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
  handleOpenDialog: handleDialogOpen
}: {
  boards: Board[];
  handleDragStart: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
  handleDragEnd: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
  handleDrop: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
  handleOpenDialog: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputElement = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = inputElement.current?.value;
    if (query) {
      setQuery(query);
    } else {
      setQuery("");
    }
  };

  const handleReset = () => {
    setQuery("");
  };

  return (
    <div class="layout-stack-4 overflow-y-auto pattern-height-board-list py-2 pr-2 pattern-scrollbar-thick">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div class="flex-row">
          <label for="board-filter">
            <div class="h-6 w-6 border-solid border-1 border-color-primary border-r-none flex-center">
              +
            </div>
          </label>
          <input
            id="board-filter"
            type="text"
            class="w-48 h-6 px-2 bg-primary border-solid border-1 border-color-primary border-l-none"
            placeholder="Filter board"
            disabled={boards.length === 0}
            ref={inputElement}
          />
          <button
            type="reset"
            class="h-6 w-6 border-solid border-1 border-color-primary text-secondary text-medium cursor-pointer"
          >
            ×
          </button>
        </div>
      </form>
      {boards.length === 0 ? (
        <button
          type="button"
          class="h-20 w-full border-none bg-secondary text-secondary hover cursor-pointer"
          onClick={handleDialogOpen}
        >
          Create new Board
        </button>
      ) : (
        <div class="layout-stack-2 overflow-y-auto pattern-height-board-list py-2 pr-2 pattern-scrollbar-thick">
          {filterBoardsByName(query, boards).map((board) => (
            <BoardItem
              key={board.id}
              board={board}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              cardsNum={board.lists.reduce(
                (acc, list) => acc + list.cards.length,
                0
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
