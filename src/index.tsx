import "./assets/main.css";
import { render } from "preact";
import Location from "./components/Location";
import Header from "./components/Header";
import Temperature from "./components/Temperature";
import AirConditions from "./components/AirConditions";
import Footer from "./components/Footer";
import DaysForecast from "./components/DaysForecast";

function App() {
    return <div className="app-container">
            <Header />
            <Location name="Budapest" />
            <Temperature value={22} />
            <DaysForecast />
            <div className="air-conditions-wrapper">
                <AirConditions realFeel={20} wind={5} clouds={75} humidity={60} />
            </div>
            <Footer />
        </div>;
}

render(<App />, document.getElementById('app'));
