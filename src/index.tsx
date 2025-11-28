import "./assets/main.css";
import { render } from "preact";
import Location from "./components/Location";
import Header from "./components/Header";
import Temperature from "./components/Temperature";
import AirConditions from "./components/AirConditions";
import Footer from "./components/Footer";
import DaysForecast from "./components/DaysForecast";
import Loading from "./components/Loading";
import { WeatherProvider, useWeather } from "./context/WeatherContext";

function WeatherApp() {
	const { weatherData, isLoading } = useWeather();

	if (isLoading || !weatherData) {
		return <Loading />;
	}

	return (
		<div className="app-container">
			<Header />
			<Location name={weatherData.name} />
			<Temperature value={weatherData.temp} />
			<DaysForecast />
			<div className="air-conditions-wrapper">
				<AirConditions
					realFeel={weatherData.feels_like}
					wind={weatherData.wind_speed}
					clouds={weatherData.clouds_all}
					humidity={weatherData.humidity}
				/>
			</div>
			<Footer />
		</div>
	);
}

function App() {
	return (
		<WeatherProvider>
			<WeatherApp />
		</WeatherProvider>
	);
}

render(<App />, document.getElementById('app'));
