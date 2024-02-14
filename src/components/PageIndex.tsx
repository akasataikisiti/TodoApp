import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardList from "./BoardList";

export default function PageIndex({ state }: { state: Signal<Board[]> }) {
  return (
    <div>
      <BoardList boards={state.value} />
    </div>
  );
}
