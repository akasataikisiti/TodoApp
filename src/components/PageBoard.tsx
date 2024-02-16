import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardHeader from "./BoardHeader";

export default function PageBoard({
  boardId,
  state
}: {
  boardId: string;
  state: Signal<Board[]>;
}) {
  const found = state.value.find((b) => {
    return b.id === boardId;
  });
  return (
    <div
      class={`flex-column h-full bg-${found?.bgColor ? found.bgColor : "primary"}`}
    >
      {found && (
        <div>
          <BoardHeader
            id={found.id}
            title={found.title}
            bgColor={found.bgColor}
          />
        </div>
      )}
      <div>aaa</div>
    </div>
  );
}
