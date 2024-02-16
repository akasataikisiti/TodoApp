export default function BoardHeader({
  id,
  title,
  bgColor
}: {
  id: string;
  title: string;
  bgColor: string | null;
}) {
  return (
    <>
      <div>{id}</div>
      <div>{title}</div>
      <div>{bgColor}</div>
    </>
  );
}
