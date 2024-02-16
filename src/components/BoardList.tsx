import { Board } from "../types/board";
import BoardItem from "./BoardItem";

export default function BoardList({ boards }: { boards: Board[] }) {
  return (
    <div class="layout-stack-2 overflow-y-auto pattern-height-board-list py-2 pr-2 pattern-scrollbar-thick">
      {boards.length === 0 ? (
        <div>Create new board</div>
      ) : (
        boards.map((board) => <BoardItem key={board.id} board={board} />)
      )}
    </div>
  );
}
