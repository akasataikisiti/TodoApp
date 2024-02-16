import { JSX } from "preact/jsx-runtime";
import { BgColor } from "../types/bgColor";

export default function FormBoardBgColor({
  selectedBgColor,
  selectBgColor
}: {
  selectedBgColor: BgColor | null;
  selectBgColor: (e: JSX.TargetedMouseEvent<HTMLInputElement>) => void;
}) {
  return (
    <div class="nowrap layout-stack-horizontal-1">
      <label>
        <input
          type="radio"
          value="none"
          class="unset"
          checked={!selectedBgColor}
          onClick={selectBgColor}
        />
        <div class="w-6 h-6 bg-primary inline-block border-solid border-1 border-color-primary pattern-color-palette" />
      </label>
      <label>
        <input
          type="radio"
          value="red"
          class="unset"
          checked={selectedBgColor === "red"}
          onClick={selectBgColor}
        />
        <div class="w-6 h-6 bg-red inline-block border-solid border-1 border-color-primary pattern-color-palette" />
      </label>
      <label>
        <input
          type="radio"
          value="yellow"
          class="unset"
          checked={selectedBgColor === "yellow"}
          onClick={selectBgColor}
        />
        <div class="w-6 h-6 bg-yellow inline-block border-solid border-1 border-color-primary pattern-color-palette" />
      </label>
      <label>
        <input
          type="radio"
          value="green"
          class="unset"
          checked={selectedBgColor === "green"}
          onClick={selectBgColor}
        />
        <div class="w-6 h-6 bg-green inline-block border-solid border-1 border-color-primary pattern-color-palette" />
      </label>
      <label>
        <input
          type="radio"
          value="blue"
          class="unset"
          checked={selectedBgColor === "blue"}
          onClick={selectBgColor}
        />
        <div class="w-6 h-6 bg-blue inline-block border-solid border-1 border-color-primary pattern-color-palette" />
      </label>
      <label>
        <input
          type="radio"
          value="cyan"
          class="unset"
          checked={selectedBgColor === "cyan"}
          onClick={selectBgColor}
        />
        <div class="w-6 h-6 bg-cyan inline-block border-solid border-1 border-color-primary pattern-color-palette" />
      </label>
      <label>
        <input
          type="radio"
          value="magenta"
          class="unset"
          checked={selectedBgColor === "magenta"}
          onClick={selectBgColor}
        />
        <div class="w-6 h-6 bg-magenta inline-block border-solid border-1 border-color-primary pattern-color-palette" />
      </label>
    </div>
  );
}
