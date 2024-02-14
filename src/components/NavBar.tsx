import { Signal } from "@preact/signals";
import { Link } from "wouter-preact";
import { Display } from "../types/display";
import AppButton from "./AppButton";

export default function NavBar({ display }: { display: Signal<Display> }) {
  const handleClick = () => {
    if (display.value === "light") {
      console.log("light");
      display.value = "dark";
    } else {
      console.log("dark");
      display.value = "light";
    }
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <AppButton display={display} onClick={handleClick} />
        </li>
      </ul>
    </nav>
  );
}
