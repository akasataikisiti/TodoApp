import { Signal, signal } from "@preact/signals";
import { Display } from "./types/display";
import { Board } from "./types/board";

export function createSignals() {
  const appDisplay: Signal<Display> = signal<Display>("light");
  const BoardSignal: Signal<Board[]> = signal<Board[]>([]);

  return {
    appDisplay,
    BoardSignal
  };
}
