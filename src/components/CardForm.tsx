export default function CardForm({
  listId,
  addCard
}: {
  listid: string;
  addCard: (title: string, listid: string) => void;
}) {
  return (
    <button class="h-8 w-full border-none text-left cursor-pointer bg-primary text-medium"></button>
  );
}
