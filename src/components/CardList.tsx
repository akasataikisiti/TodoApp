import { JSX } from "preact/jsx-runtime";
import { Card } from "../types/card";
import CardItem from "./CardItem";

export default function CardList({
  cards,
  listId,
  deleteCard,
  updateCardTitle,
  handleDragEndCard,
  handleDragStartCard,
  handleDropOnCard
}: {
  cards: Card[];
  listId: string;
  deleteCard: (id: string, listId: string) => void;
  updateCardTitle: (cardId: string, cardTitle: string, listId: string) => void;
  handleDragEndCard: () => void;
  handleDragStartCard: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
  handleDropOnCard: (e: JSX.TargetedDragEvent<HTMLDivElement>) => void;
}) {
  return (
    <div class="layout-stack-2 pattern-height-card-list overflow-y-auto pattern-scrollbar-thin">
      {cards.length === 0 ? (
        <div class="h-4"> </div>
      ) : (
        cards.map((card, idx) => (
          <CardItem
            key={idx}
            cardId={card.id}
            listId={listId}
            cardTitle={card.title}
            deleteCard={deleteCard}
            updateCardTitle={updateCardTitle}
            handleDragEnd={handleDragEndCard}
            handleDragStart={handleDragStartCard}
            handleDrop={handleDropOnCard}
          />
        ))
      )}
    </div>
  );
}
