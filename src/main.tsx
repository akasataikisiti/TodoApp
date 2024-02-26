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
import PageBoard from "./components/PageBoard";
import { RepositoryLocalFile } from "./repositories/repository";
import { ApplicationService } from "./applications/applicationService";
import { applyDisplay } from "./utils";

const appDisplay: Signal<Display> = createSignals().appDisplay;
const boardsState: Signal<Board[]> = createSignals().BoardSignal;

function Main() {
  const repository = new RepositoryLocalFile();
  const service = new ApplicationService(repository);

  useEffect(() => {
    const boards: Board[] | undefined = service.load();
    if (boards.length > 0) {
      boardsState.value = boards;
    }
    applyDisplay(appDisplay.value);
  }, []);
  return (
    <>
      <NavBar display={appDisplay} />
      <main class="f-1 overflow-y-auto pattern-scrollbar-thick bg-primary">
        <Route path="/">
          <PageIndex state={boardsState} />
        </Route>
        <Route path="/components">
          <PageComponents />
        </Route>
        <Route path="/board/:boardid">
          {(params) => (
            <PageBoard boardId={params.boardid} state={boardsState} />
          )}
        </Route>
        <Route path="/board/:boardid/card/:cardid">
          {(params) => {
            <PageBoard
              boardId={params.boardid}
              state={boardsState}
              cardId={params.cardid}
            />;
          }}
        </Route>
      </main>
    </>
  );
}

render(<Main />, document.getElementById("app")!);
