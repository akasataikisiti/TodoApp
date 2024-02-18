import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardHeader from "./BoardHeader";
import ListHeader from "./ListHeader";
import CardList from "./CardList";

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
      <div class="f-1 flex-row layout-stack-horizontal-4 overflow-x-auto px-3 pattern-scrollbar-thick">
        {found &&
          found.lists.map((list, idx) => (
            <div key={idx} class="flex-column">
              <div class="w-64 p-3 bg-secondary rounded-2 layout-stack-3 drop-shadow">
                <ListHeader id={list.id} title={list.title} />
                <CardList cards={list.cards} listId={list.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
