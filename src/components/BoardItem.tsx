import { Link } from "wouter-preact";
import { Board } from "../types/board";
import { JSX } from "preact/jsx-runtime";

export default function BoardItem({
  board,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDrop,
  cardsNum
}: {
  board: Board;
  handleDragStart: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
  handleDragEnd: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
  handleDrop: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
  cardsNum: number;
}) {
  return (
    <div
      class={`flex-column h-20 bg-primary border-solid border-2 border-color-primary hover-bg-board-item bg-${board.bgColor ? board.bgColor : "primary"}`}
      draggable
      data-board-id={board.id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Link
        href={`/board/${board.id}`}
        class="p-4 cursor-pointer flex-column layout-stack-2 text-decoration-none text-primary"
        draggable={false}
      >
        <div class="h-6 flex-row">
          <div class="f-1">{board.title}</div>
          <div class="text-secondary font-mono px-1">{cardsNum}</div>
        </div>
      </Link>
    </div>
  );
}
