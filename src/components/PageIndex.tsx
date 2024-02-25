import { Signal } from "@preact/signals";
import { Board } from "../types/board";
import BoardList from "./BoardList";
import { useRef, useState } from "preact/hooks";
import { BoardFormDialog } from "./BoardFormDialog";
import { BgColor } from "../types/bgColor";
import { ApplicationService } from "../applications/applicationService";
import { RepositoryLocalFile } from "../repositories/repository";
import { JSX } from "preact/jsx-runtime";

export default function PageIndex({ state }: { state: Signal<Board[]> }) {
  const [draggingBoardId, setDraggingBoardId] = useState<string | undefined>(
    undefined
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const detailsElement = useRef<HTMLDetailsElement>(null);
  const repository = new RepositoryLocalFile();
  const service = new ApplicationService(repository);
  // const inputFileElement = useRef<HTMLInputElement>(null);

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
  const handleDragEnd = () => setDraggingBoardId(undefined);
  const handleDragOver = (e: JSX.TargetedDragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("drag over");
  };

  const handleDragStart = (e: JSX.TargetedDragEvent<HTMLDivElement>) => {
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
    const { boardId } = e.currentTarget.dataset;
    if (boardId) {
      setDraggingBoardId(boardId);
    }
  };

  const handleDrop = (e: JSX.TargetedDragEvent<HTMLDivElement>) => {
    const { boardId } = e.currentTarget.dataset;
    const droppedBoardId: string = boardId as string;
    if (draggingBoardId === droppedBoardId) return;
    if (droppedBoardId && draggingBoardId) {
      state.value = service.moveBoard(
        state.value,
        draggingBoardId,
        droppedBoardId
      );
    }
  };

  const handleChangeInput = (e: JSX.TargetedInputEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files?.length === 0) return;
    const reader = new FileReader();
    const file = files[0];
    reader.addEventListener(
      "load",
      () => {
        if (typeof reader.result === "string") {
          // id duplicate check
          const importResult: Board[] = JSON.parse(reader.result);
          const importResultIds: string[] = importResult.map(
            (b: Board) => b.id
          );
          const currentBoards: string[] = state.value.map((b: Board) => b.id);
          const isDuplicate = importResultIds.some((id: string) =>
            currentBoards.includes(id)
          );
          if (!isDuplicate) {
            state.value = service.import(state.value, importResult);
          } else {
            window.alert("The board ID is duplicated.");
          }
        }
      },
      false
    );
    reader.readAsText(file);
  };

  const addBoard = (
    title: string,
    listTitles: string[],
    bgColor: BgColor | null
  ) => {
    state.value = service.createBoard(state.value, title, listTitles, bgColor);
  };

  const STORAGE_LIMIT = 5200000;
  const LOCAL_STORAGE_KEY = "MY_TODOS";
  const getsize = (storage_key: string) => {
    if (localStorage[storage_key]) {
      return new Blob([localStorage[storage_key]]).size;
    }
    return 0;
  };
  const storageDataSize = getsize(LOCAL_STORAGE_KEY);

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
                          download={"MyTodoApps.json"}
                          href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(state.value))}`}
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
                            // ref={inputFileElement}
                            onChange={handleChangeInput}
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
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleOpenDialog={handleDialogOpen}
            />
          </div>
          <div>
            <h2 class="text-medium">Storage</h2>
            {storageDataSize > 0 && (
              <div class="py-2">
                <span class="text-secondary font-mono">
                  {storageDataSize} / {STORAGE_LIMIT} bytes used on localStorage
                </span>
                <progress
                  class="pattern-progress w-full h-4"
                  max={STORAGE_LIMIT}
                  value={storageDataSize}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
