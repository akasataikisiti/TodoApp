import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardList from "./BoardList";
import { useRef, useState } from "preact/hooks";
import { BoardFormDialog } from "./BoardFormDialog";
import { BgColor } from "../types/bgColor";
import { ApplicationService } from "../applications/applicationService";
import { RepositoryLocalFile } from "../repositories/repository";

export default function PageIndex({ state }: { state: Signal<Board[]> }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const detailsElement = useRef<HTMLDetailsElement>(null);
  const repository = new RepositoryLocalFile();
  const service = new ApplicationService(repository);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClickClear = () => {
    if (confirm("Are you sure you want to delete all boards?")) {
      state.value = service.clear();
      detailsElement.current?.removeAttribute("open");
    }
  };

  const addBoard = (
    title: string,
    listTitles: string[],
    bgColor: BgColor | null
  ) => {
    state.value = service.createBoard(state.value, title, listTitles, bgColor);
  };

  return (
    <div class="px-3">
      <div class="layout-center overflow-hidden w-full layout-stack-8">
        <div class="overflow-hidden">
          <div class="layout-stack-2">
            <div class="flex-row h-10 py-3">
              <h2 class="text-medium text-primary f-1 m-0">Boards</h2>
              <div class="flex-row layout-stack-horizontal-1">
                <button
                  class="w-6 h-6 border-1 border-solid border-color-primary bg-transparent cursor-pointer hover text-medium"
                  type="button"
                  onClick={handleDialogOpen}
                >
                  +
                </button>
                <details class="pattern-dropdown">
                  <summary class="w-6 h-6 border-solid border-1 border-color-primary flex-column cursor-pointer hover">
                    <div class="m-auto text-secondary">...</div>
                  </summary>
                  <div class="border-solid border-1 border-color-primary py-2 bg-primary drop-shadow">
                    <ul class="list-style-none p-0 m-0 text-secondary">
                      <li class="h-8">
                        <button
                          class="w-full text-left px-4 py-2 cursor-pointer border-none bg-primary hover nowrap text-primary"
                          type="button"
                          onClick={handleClickClear}
                        >
                          Delete boards
                        </button>
                      </li>
                      <li class="h-8">
                        <a
                          class="px-4 py-2 text-primary cursor-pointer text-small text-decoration-none block hover"
                          download={"trellith.json"}
                        >
                          Export
                        </a>
                      </li>
                      <li class="h-8">
                        <label>
                          <span class="px-4 py-2 text-primary cursor-pointer text-small block hover">
                            Import
                          </span>
                          <input
                            class="pattern-file display-none"
                            type="file"
                            accept=".json"
                          />
                        </label>
                      </li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
          <div>
            <BoardFormDialog
              open={dialogOpen}
              handleClickMask={handleDialogClose}
              addBoard={addBoard}
            />
          </div>
          <div class="overflow-y-auto">
            <BoardList
              boards={state.value}
              handleOpenDialog={handleDialogOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
