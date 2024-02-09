import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardList from "./BoardList";

export default function PageIndex({ boards }: { boards: Signal<Board[]> }) {
  return (
    <div>
      <BoardList boards={boards} />
    </div>
  );
}
