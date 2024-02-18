export default function CardItem({
  id,
  listId,
  cardTitle
}: {
  id: string;
  listId: string;
  cardTitle: string;
}) {
  return (
    <div class="rounded-1 p-2 bg-primary flex-column cursor-grab drop-shadow pattern-hiding-child hover-bg-card-item">
      <div class="p-4 cursor-pointer flex-column layout-stack-2 text-decoration-none text-primary">
        {`${id} ${listId} ${cardTitle}`}
      </div>
    </div>
  );
}
