import { Signal, signal } from "@preact/signals";
import { Display } from "./types/display";
import { Board } from "./types/board";
import { getDisplay } from "./utils";

export function createSignals() {
  const appDisplay: Signal<Display> = signal<Display>(getDisplay());
  const BoardSignal: Signal<Board[]> = signal<Board[]>([]);

  return {
    appDisplay,
    BoardSignal
  };
}
