import { Signal } from "@preact/signals";
import { Link } from "wouter-preact";
import { Display } from "../types/display";
import AppButton from "./AppButton";
import { applyDisplay, setDisplay } from "../utils";

export default function NavBar({ display }: { display: Signal<Display> }) {
  const handleClick = () => {
    if (display.value === "light") {
      display.value = "dark";
    } else {
      display.value = "light";
    }
    applyDisplay(display.value);
    setDisplay(display.value);
  };
  return (
    <nav>
      <div class="h-12 p-3 flex-row bg-primary border-0 border-b-1 border-solid border-color-primary">
        <div class="f-1 h-6" />
        <div class="w-24 h-6">
          <Link href="/" class="text-decoration-none h-6">
            <h1 class="m-0 h-6 text-center text-medium text-primary font-weight-600 hover-bg-link cursor-pointer">
              Home
            </h1>
          </Link>
        </div>
        <div class="f-1 h-6 text-right">
          <div class="layout-stack-horizontal-1">
            <Link
              href="/components"
              class="text-decoration-none text-secondary text-small hover px-2 py-1"
            >
              About
            </Link>
            <AppButton display={display} onClick={handleClick} />
          </div>
        </div>
      </div>
    </nav>
  );
}
