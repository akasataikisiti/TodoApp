import { render } from "preact";
import "./css/index.css";

function Main() {
  return (
    <div>
      <h1>My Preact App</h1>
      <p>
        Edit <code>src/main.tsx</code> and save to test HMR
      </p>
    </div>
  );
}

render(<Main />, document.getElementById("app")!);
