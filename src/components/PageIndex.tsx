import { v4 as uuidv4 } from "uuid";
import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardList from "./BoardList";
import { useState } from "preact/hooks";
import { BoardFormDialog } from "./BoardFormDialog";

export default function PageIndex({ state }: { state: Signal<Board[]> }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const addBoard = (name: string) => {
    state.value = [
      ...state.value,
      {
        id: uuidv4(),
        title: name,
        data: "asdfasdfasdf"
      }
    ];
  };

  return (
    <div class="px-3">
      <div class="layout-center overflow-hidden w-full layout-stack-8">
        <div class="overflow-hidden">
          <div class="layout-stack-2">
            <div class="flex-row h-10 py-3">
              <h2 class="text-medium text-primary f-1 m-0">Boards</h2>
              <button
                class="w-6 h-6 border-1 border-solid border-color-primary bg-transparent cursor-pointer hover"
                type="button"
                onClick={handleDialogOpen}
              >
                +
              </button>
              <details>...</details>
            </div>
          </div>
          <div>
            <BoardFormDialog
              open={dialogOpen}
              handleClickMask={handleDialogClose}
              addBoard={addBoard}
            />
          </div>
        </div>
        <BoardList boards={state.value} />
      </div>
    </div>
  );
}
