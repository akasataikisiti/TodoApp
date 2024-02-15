import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardList from "./BoardList";

export default function PageIndex({ state }: { state: Signal<Board[]> }) {
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
                onClick={() => console.log("test")}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <BoardList boards={state.value} />
      </div>
    </div>
  );
}
