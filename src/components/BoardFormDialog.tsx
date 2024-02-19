import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { BgColor } from "../types/bgColor";
import FormBoardBgColor from "./FormBoardBgColor";

type listsType = "None" | "Preset";

export function BoardFormDialog({
  open,
  handleClickMask,
  addBoard
}: {
  open: boolean;
  handleClickMask: () => void;
  addBoard: (
    title: string,
    listTitles: string[],
    bgColor: BgColor | null
  ) => void;
}) {
  const refName = useRef<HTMLInputElement>(null);
  const [bgColor, setBgColor] = useState<BgColor | null>(null);
  const [listsType, setListsType] = useState<listsType>("None");

  const selectBgColor = (e: JSX.TargetedMouseEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== "none") {
      setBgColor(e.currentTarget.value as BgColor);
    } else {
      setBgColor(null);
    }
  };

  const handleChangeListsType = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    setListsType(e.currentTarget.value as listsType);
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (refName.current) {
      if (refName.current.value !== "") {
        addBoard(
          refName.current.value,
          listsType === "None" ? [] : ["Todo", "Doing", "Done"],
          bgColor
        );
        handleClickMask();
      }
    }
  };

  useEffect(() => {
    if (open) {
      refName.current?.focus();
    }
  }, [open]);

  if (open) {
    return (
      <>
        <div class="pattern-mask" onClick={handleClickMask} />
        <dialog
          class="layout-center p-8 border-solid border-1 border-color-primary bg-primary w-full"
          open={open}
        >
          <form onSubmit={handleSubmit} class="layout-stack-8">
            <div class="layout-stack-4">
              <label class="flex-column layout-stack-2">
                <span class="text-secondary text-small">Board name</span>
                <input
                  class="h-8 w-64 px-2 border-solid border-1 border-color-primary"
                  type="text"
                  maxlength={24}
                  ref={refName}
                />
              </label>
              <div class="layout-stack-2">
                <div class="text-secondary text-small">Default lists</div>
                <div class="flex-column border-none text-secondary text-small layout-stack-1 pl-2">
                  <label>
                    <input
                      type="radio"
                      value="None"
                      class=""
                      checked={listsType === "None"}
                      onClick={handleChangeListsType}
                    />
                    <span class="px-1">None</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Preset"
                      class=""
                      checked={listsType === "Preset"}
                      onClick={handleChangeListsType}
                    />
                    <span class="px-1">Todo, Doing, Done</span>
                  </label>
                </div>
              </div>
              <div class="layout-stack-2">
                <div class="text-secondary text-small">Background Color</div>
                <div class="text-secondary text-small layout-stack-horizontal-1">
                  <FormBoardBgColor
                    selectBgColor={selectBgColor}
                    selectedBgColor={bgColor}
                  />
                </div>
              </div>
            </div>
            <div class="">
              <button class="h-6 px-4 border-solid border-1 border-color-primary cursor-pointer bg-transparent">
                Create
              </button>
            </div>
          </form>
        </dialog>
      </>
    );
  }
  return <></>;
}
