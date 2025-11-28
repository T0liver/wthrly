import "./assets/main.css";
import { render } from "preact";
import Card from "./components/Card";

function App() {
    return <div>
            <h1>Hello, Vite + React!</h1>
            <Card day="Tmrrw" tempC={10.5}  />
        </div>;
}

render(<App />, document.getElementById('app'));
