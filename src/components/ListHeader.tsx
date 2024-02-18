export default function ListHeader({
  id,
  title
}: {
  id: string;
  title: string;
}) {
  return (
    <div class="flex-row h-6 cursor-grab">
      <div class="flex-row">
        <div class="f-1 nowrap overflow-x-hidden text-overflow-elipsis">
          {title}
          {id}
        </div>
      </div>
    </div>
  );
}
