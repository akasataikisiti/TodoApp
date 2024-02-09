import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardItem from "./BoardItem";

export default function BoardList({ boards }: { boards: Signal<Board[]> }) {
  return (
    <div>
      {boards.value.length === 0 ? (
        <div>Create new board</div>
      ) : (
        boards.value.map((board) => <BoardItem key={board.id} board={board} />)
      )}
    </div>
  );
}
