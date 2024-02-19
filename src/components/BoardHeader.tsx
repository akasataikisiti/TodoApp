import { useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export default function BoardHeader({
  id,
  title,
  bgColor,
  updateBoardName
}: {
  id: string;
  title: string;
  bgColor: string | null;
  updateBoardName: (id: string, title: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsEditing(true);
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
    </div>
  );
}
