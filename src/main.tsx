import { render } from "preact";
import "./css/index.css";

import { Route } from "wouter-preact";
import { Signal, signal } from "@preact/signals";
import { Board } from "./types/board";
import { useEffect } from "preact/hooks";
import PageIndex from "./components/PageIndex";

const boardsState: Signal<Board[]> = signal<Board[]>([]);
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
      <Route path="/">
        <PageIndex state={boardsState} />
      </Route>
      <Route path="/tes">
        <div>tes</div>
      </Route>
    </>
  );
}

render(<Main />, document.getElementById("app")!);
