import { Signal } from "@preact/signals";
import { Board } from "../types/board";

export default function PageIndex({ state }: { state: Signal<Board[]> }) {
  return (
    <div>
      <h1>Boards</h1>
      <ul>
        {state.value.map((board) => (
          <li key={board.id}>{board.title + " " + board.data}</li>
        ))}
      </ul>
    </div>
  );
}
