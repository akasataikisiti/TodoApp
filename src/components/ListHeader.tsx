import { useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export default function ListHeader({
  titleId,
  title,
  cardsNum,
  updateListTitle
}: {
  titleId: string;
  title: string;
  cardsNum: number;
  updateListTitle: (listId: string, newTitle: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputElement.current?.value) {
      updateListTitle(titleId, inputElement.current.value);
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
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
              onClick={handleClick}
            >
              {title}
            </div>
            <div class="px-2 text-secondary font-mono">{cardsNum}</div>
          </div>
        )}
      </div>
    </div>
  );
}
