import { Card } from "../types/card";
import CardItem from "./CardItem";

export default function CardList({
  cards,
  listId
}: {
  cards: Card[];
  listId: string;
}) {
  return (
    <div class="layout-stack-2 pattern-height-card-list overflow-y-auto pattern-scrollbar-thin">
      {cards.length === 0 ? (
        <div class="h-4"> </div>
      ) : (
        cards.map((card, idx) => (
          <CardItem
            key={idx}
            id={card.id}
            listId={listId}
            cardTitle={card.title}
          />
        ))
      )}
    </div>
  );
}
