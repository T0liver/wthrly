import "./assets/main.css";
import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import Location from "./components/Location";
import Header from "./components/Header";
import Temperature from "./components/Temperature";
import AirConditions from "./components/AirConditions";
import Footer from "./components/Footer";
import DaysForecast from "./components/DaysForecast";
import { getWeatherData, UIData } from "./services/weatherService";
import Loading from "./components/Loading";

function App() {
    const location = "Budapest";
    const [currentWeather, setCurrentWeather] = useState<UIData | null>(null);

    useEffect(() => {
        getWeatherData(location).then(setCurrentWeather);
    }, [location]);

    if (!currentWeather) {
        return <Loading />;
    }

    return <div className="app-container">
            <Header />
            <Location name={location} />
            <Temperature value={currentWeather.temp} />
            <DaysForecast />
            <div className="air-conditions-wrapper">
                <AirConditions
                    realFeel={currentWeather.feels_like}
                    wind={currentWeather.wind_speed}
                    clouds={currentWeather.clouds_all}
                    humidity={currentWeather.humidity}
                />
            </div>
            <Footer />
        </div>;
}

render(<App />, document.getElementById('app'));
