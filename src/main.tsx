import { render } from "preact";
import "./css/index.css";

import { Route } from "wouter-preact";
import { Signal, signal } from "@preact/signals";
import { Board } from "./types/board";
import { useEffect } from "preact/hooks";
import PageIndex from "./components/PageIndex";
import PageComponents from "./components/PageComponents";
import NavBar from "./components/NavBar";
import { createSignals } from "./appSignals";
import { Display } from "./types/display";

const boardsState: Signal<Board[]> = signal<Board[]>([]);
const appDisplay: Signal<Display> = createSignals().appDisplay;
const testBoards: Board[] = [
  {
    id: "id1",
    title: "Title 1",
    data: "asdfasdf"
  },
  {
    id: "id2",
    title: "Title 2",
    data: "asdfasdfaaa"
  }
];

function Main() {
  useEffect(() => {
    boardsState.value = testBoards;
  }, []);
  return (
    <>
      <NavBar display={appDisplay} />
      <main>
        <Route path="/">
          <PageIndex state={boardsState} />
        </Route>
        <Route path="/components">
          <PageComponents />
        </Route>
      </main>
    </>
  );
}

render(<Main />, document.getElementById("app")!);
