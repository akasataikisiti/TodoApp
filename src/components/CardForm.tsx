import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export default function CardForm({
  listId,
  addCard
}: {
  listId: string;
  addCard: (listId: string, cardTitle: string) => void;
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const [composing, setComposing] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  });

  const handleBlur = () => {
    setEditing(false);
  };
  const handleClick = () => {
    setEditing(true);
  };

  const handleKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !composing) {
      e.preventDefault();
      if (ref.current?.value) {
        addCard(listId, e.currentTarget.value);
        ref.current.value = "";
      }
    }
  };

  const handleCompositionStart = () => {
    setComposing(true);
  };

  const handleCompositionEnd = () => {
    setComposing(false);
  };

  return (
    <button
      class="h-8 w-full border-none text-left cursor-pointer bg-primary text-medium"
      onClick={handleClick}
    >
      {editing ? (
        <textarea
          class="w-full border-none rounded-1 p-2 resize-none text-medium font-sans-serif"
          onBlur={handleBlur}
          // @ts-expect-error - TS doesn't know about these events
          oncompositionstart={handleCompositionStart}
          oncompositionend={handleCompositionEnd}
          onKeyDown={handleKeyDown}
          ref={ref}
        />
      ) : (
        <div class="px-2">
          <span class="text-secondary">Add a card</span>
        </div>
      )}
    </button>
  );
}
