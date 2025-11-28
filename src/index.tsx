import "./assets/main.css";
import { render } from "preact";
import Card from "./components/Card";
import Location from "./components/Location";
import Header from "./components/Header";
import Temperature from "./components/Temperature";

function App() {
    return <div className="app-container">
            <Header />
            <Location name="Budapest" />
            <Temperature value={22} />
            <Card day="Tmrrw" tempC={10.5}  />
        </div>;
}

render(<App />, document.getElementById('app'));
