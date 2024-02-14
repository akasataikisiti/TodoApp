import { Signal, signal } from "@preact/signals";
import { Display } from "./types/display";

export function createSignals() {
  const appDisplay: Signal<Display> = signal<Display>("light");

  return {
    appDisplay
  };
}
