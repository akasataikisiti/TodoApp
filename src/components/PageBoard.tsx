import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardHeader from "./BoardHeader";
import ListHeader from "./ListHeader";
import CardList from "./CardList";
import { ApplicationService } from "../applications/applicationService";
import { RepositoryLocalFile } from "../repositories/repository";
import { JSX } from "preact/jsx-runtime";
import { useRef } from "preact/hooks";

export default function PageBoard({
  boardId,
  state
}: {
  boardId: string;
  state: Signal<Board[]>;
}) {
  const inputElement = useRef<HTMLInputElement>(null);

  const repository = new RepositoryLocalFile();
  const service = new ApplicationService(repository);
  const found = state.value.find((b) => {
    return b.id === boardId;
  });

  const updateState = (boards: Board[]) => {
    state.value = boards;
  };

  const updateBoardName = (id: string, title: string) => {
    const update = service.updateBoardTitle(state.value, title, id);
    updateState(update);
  };

  const handleSubmitList = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputElement.current) {
      const updated = service.createList(
        state.value,
        inputElement.current.value,
        boardId
      );
      updateState(updated);
      inputElement.current.value = "";
    }
  };

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
            updateBoardName={updateBoardName}
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
        <div class="py-3">
          <form onSubmit={handleSubmitList}>
            <div class="border-1 border-soild border-color-primary inline-block">
              <input
                ref={inputElement}
                class="h-6 px-2 border-none"
                // class="w-64 p-3 bg-secondary rounded-2 layout-stack-3 drop-shadow"
                type="text"
                placeholder="Enter list title..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
