import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export default function CardItem({
  cardId,
  listId,
  cardTitle,
  deleteCard,
  updateCardTitle
}: {
  cardId: string;
  listId: string;
  cardTitle: string;
  deleteCard: (id: string, listId: string) => void;
  updateCardTitle: (cardId: string, cardTitle: string, listId: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  const isSeparator = (cardTitle: string) => {
    return cardTitle === "---";
  };
  const hendleKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (ref.current?.value) {
        updateCardTitle(cardId, ref.current.value, listId);
        setEditing(false);
      } else if (ref.current?.value === "") {
        deleteCard(cardId, listId);
        setEditing(false);
      }
    }
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleClickEdit = () => {
    setEditing(true);
  };

  return (
    <div class="rounded-1 p-2 bg-primary flex-column cursor-grab drop-shadow pattern-hiding-child hover-bg-card-item">
      <div class="f-1 overflow-x-hidden">
        {editing ? (
          <textarea
            class="w-full border-none rounded-1 p-2 resize-none text-medium font-sans-serif"
            ref={ref}
            onKeyDown={hendleKeyDown}
            onBlur={handleBlur}
          >
            {cardTitle}
          </textarea>
        ) : (
          <>
            {!isSeparator(cardTitle) ? (
              <div class="overflow-wrap-break-word" onClick={handleClickEdit}>
                {cardTitle}
              </div>
            ) : (
              <button
                class="w-full h-4 bg-transparent border-none px-2"
                onClick={handleClickEdit}
              >
                <hr class="border-solid border-1 border-color-primary" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
