import { render } from "preact";
import "./css/index.css";

import BoardForm from "./components/BoardForm";
import { Route } from "wouter-preact";

function Main() {
  return (
    <>
      <Route path="/">
        <BoardForm />
      </Route>
      <Route path="/tes">
        <div>tes</div>
      </Route>
    </>
  );
}

render(<Main />, document.getElementById("app")!);
