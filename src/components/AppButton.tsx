import { Signal } from "@preact/signals";
import { Display } from "../types/display";

export default function AppButton({
  display,
  onClick
}: {
  display: Signal<Display>;
  onClick: () => void;
}) {
  return (
    <>
      <button onClick={onClick}>{display}</button>
    </>
  );
}
