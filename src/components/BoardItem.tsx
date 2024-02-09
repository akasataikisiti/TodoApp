import { Board } from "../types/board";

export default function BoardItem({ board }: { board: Board }) {
  return <div>{`${board.title} ${board.data}`}</div>;
}
