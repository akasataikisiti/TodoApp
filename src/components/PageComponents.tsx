import { Board } from "../types/board";
import BoardItem from "./BoardItem";
import BoardList from "./BoardList";

export default function PageComponents() {
  const board1: Board = { id: "1", title: "Board 1", data: "Data 1" };
  const board2: Board = { id: "2", title: "Board 2", data: "Data 2" };
  const board3: Board = { id: "3", title: "Board 3", data: "Data 3" };
  const boards: Board[] = [board1, board2, board3];

  return (
    <>
      <div>
        <BoardItem board={board1} />
      </div>
      <div>
        <BoardList boards={boards} />
      </div>
      <div class="layout-stack-2">
        <div>アイテム 1</div>
        <div>アイテム 2</div>
        <div>アイテム 3</div>
        <div>アイテム 4</div>
      </div>
    </>
  );
}
