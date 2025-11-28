import "./assets/main.css";
import { render } from "preact";
import Card from "./components/Card";
import Location from "./components/Location";

function App() {
    return <div>
            <h1>Hello, Vite + React!</h1>
            <Location name="Budapest" />
            <Card day="Tmrrw" tempC={10.5}  />
        </div>;
}

render(<App />, document.getElementById('app'));
