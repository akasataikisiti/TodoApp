import { useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import FormBoardBgColor from "./FormBoardBgColor";
import { BgColor } from "../types/bgColor";
import { navigate } from "wouter-preact/use-browser-location";

export default function BoardHeader({
  id,
  title,
  bgColor,
  updateBoardName,
  selectBgColor,
  deleteBoard
}: {
  id: string;
  title: string;
  bgColor: BgColor | null;
  updateBoardName: (id: string, title: string) => void;
  selectBgColor: (e: JSX.TargetedMouseEvent<HTMLInputElement>) => void;
  deleteBoard: (boardId: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputElement.current?.focus();
    }, 100);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputElement.current?.value) {
      updateBoardName(id, inputElement.current.value);
    }
    setIsEditing(false);
  };

  const handleClickDelete = () => {
    deleteBoard(id);
    navigate("/");
  };

  return (
    <div class="flex-row h-12 py-3">
      <h2 class="f-1 text-medium m-0" onClick={handleClick}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              class="h-6 w-64 text-medium"
              onBlur={handleBlur}
              ref={inputElement}
            />
          </form>
        ) : (
          <div>{title}</div>
        )}
      </h2>
      <div class="w-6 h-6 bg-primary">
        <details class="pattern-dropdown">
          <summary class="w-6 h-6 border-solid border-1 border-color-primary flex-column cursor-pointer">
            <div class="m-auto text-secondary">...</div>
          </summary>
          <div class="border-solid border-1 border-color-primary py-2 bg-primary drop-shadow">
            <ul class="list-style-none p-0 m-0 text-secondary">
              <li class="">
                <div class="px-4">
                  <FormBoardBgColor
                    selectedBgColor={bgColor}
                    selectBgColor={selectBgColor}
                  />
                </div>
              </li>
              <li class="h-8">
                <button
                  class="w-full px-4 py-2 cursor-pointer border-none bg-primary hover"
                  type="button"
                  onClick={handleClickDelete}
                >
                  Delete board
                </button>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
}
