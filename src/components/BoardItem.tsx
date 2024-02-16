import { Link } from "wouter-preact";
import { Board } from "../types/board";

export default function BoardItem({ board }: { board: Board }) {
  return (
    <div
      class={`flex-column h-20 bg-primary border-solid border-2 border-color-primary hover-bg-board-item bg-${board.bgColor ? board.bgColor : "primary"}`}
    >
      <Link
        href={`/board/${board.id}`}
        class="p-4 cursor-pointer flex-column layout-stack-2 text-decoration-none text-primary"
      >
        {`${board.id} ${board.title} ${board.bgColor}`}
      </Link>
    </div>
  );
}
