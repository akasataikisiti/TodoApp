import { Board } from "../types/board";
import BoardItem from "./BoardItem";

export default function BoardList({ boards }: { boards: Board[] }) {
  return (
    <div>
      {boards.length === 0 ? (
        <div>Create new board</div>
      ) : (
        boards.map((board) => <BoardItem key={board.id} board={board} />)
      )}
    </div>
  );
}
