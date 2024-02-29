import { useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export default function ListHeader({
  listId,
  title,
  cardsNum,
  updateListTitle,
  deleteList,
  deleteAllCards
}: {
  listId: string;
  title: string;
  cardsNum: number;
  updateListTitle: (listId: string, newTitle: string) => void;
  deleteList: (listId: string) => void;
  deleteAllCards: (listId: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputElement.current?.value) {
      updateListTitle(listId, inputElement.current.value);
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleClickEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputElement.current?.focus();
    }, 100);
  };

  const handleClickDeleteAllCards = (
    e: JSX.TargetedMouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    deleteAllCards(listId);
  };

  const handleClickDeleteList = (
    e: JSX.TargetedMouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this list?")) {
      deleteList(listId);
    }
  };

  return (
    <div class="flex-row h-6 cursor-grab">
      <div class="f-1 overflow-hidden">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              ref={inputElement}
              onBlur={handleBlur}
            />
          </form>
        ) : (
          <div class="flex-row">
            <div
              class="f-1 nowrap overflow-x-hidden text-overflow-elipsis"
              onClick={handleClickEdit}
            >
              {title}
            </div>
            <div class="px-2 text-secondary font-mono">{cardsNum}</div>
          </div>
        )}
      </div>
      <div class="w-6">
        <details class="pattern-dropdown">
          <summary class="w-6 h-6 flex-column cursor-pointer hover">
            <div class="m-auto text-secondary">...</div>
          </summary>
          <div class="py-2 border-solid border-1 border-color-primary bg-primary drop-shadow">
            <ul class="list-style-none p-0 m-0 text-secondary">
              <li class="h-8">
                <button
                  class="px-4 py-2 cursor-pointer border-none bg-primary hover nowrap w-full text-left text-small"
                  type="button"
                  onClick={handleClickDeleteAllCards}
                >
                  Delete all cards in this list
                </button>
              </li>
              <li class="h-8">
                <button
                  class="px-4 py-2 cursor-pointer border-none bg-primary hover nowrap w-full text-left text-small"
                  type="button"
                  onClick={handleClickDeleteList}
                >
                  Delete this list
                </button>
              </li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
}
