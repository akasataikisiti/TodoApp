import { render } from "preact";
import "./css/token.css";
import "./css/reset.css";
import "./css/base.css";
import "./css/utility.css";
import "./css/layout.css";
import "./css/pattern.css";

import { Route } from "wouter-preact";
import { Signal } from "@preact/signals";
import { Board } from "./types/board";
import { useEffect } from "preact/hooks";
import PageIndex from "./components/PageIndex";
import PageComponents from "./components/PageComponents";
import NavBar from "./components/NavBar";
import { createSignals } from "./appSignals";
import { Display } from "./types/display";

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

const appDisplay: Signal<Display> = createSignals().appDisplay;
const boardsState: Signal<Board[]> = createSignals().BoardSignal;

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
