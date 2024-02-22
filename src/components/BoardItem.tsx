import { Link } from "wouter-preact";
import { Board } from "../types/board";

export default function BoardItem({
  board,
  cardsNum
}: {
  board: Board;
  cardsNum: number;
}) {
  return (
    <div
      class={`flex-column h-20 bg-primary border-solid border-2 border-color-primary hover-bg-board-item bg-${board.bgColor ? board.bgColor : "primary"}`}
    >
      <Link
        href={`/board/${board.id}`}
        class="p-4 cursor-pointer flex-column layout-stack-2 text-decoration-none text-primary"
      >
        <div class="h-6 flex-row">
          <div class="f-1">{board.title}</div>
          <div class="text-secondary font-mono px-1">{cardsNum}</div>
        </div>
      </Link>
    </div>
  );
}
