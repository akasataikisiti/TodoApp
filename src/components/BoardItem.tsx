import { Board } from "../types/board";

export default function BoardItem({ board }: { board: Board }) {
  return <div>{`${board.id} ${board.title} ${board.data}`}</div>;
}
