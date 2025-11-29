import "./assets/main.css";
import { render } from "preact";
import { useState } from "preact/hooks";
import Location from "./components/Location";
import Header from "./components/Header";
import Temperature from "./components/Temperature";
import AirConditions from "./components/AirConditions";
import Footer from "./components/Footer";
import DaysForecast from "./components/DaysForecast";
import Loading from "./components/Loading";
import Hamburger from "./components/Hamburger";
import SideBar from "./components/SideBar";
import { WeatherProvider, useWeather } from "./context/WeatherContext";
import SunRiseSet from "./components/SunRiseSet";
import WindDirection from "./components/WinDirection";

function WeatherApp() {
	const { weatherData, isLoading, error } = useWeather();
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	if (isLoading || !weatherData) {
		return <Loading />;
	}

	return (
		<div className="app-container">
			<Hamburger onClick={() => setSidebarOpen(true)} />
			<SideBar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
			<Header />
			<Location name={weatherData.name} />
			<Temperature
				value={weatherData.temp}
				icon={weatherData?.weather_icon}
				description={weatherData?.weather_description}
			/>
			<DaysForecast />
			<div className="infos-wrapper">
				<AirConditions
					realFeel={weatherData.feels_like}
					wind={weatherData.wind_speed}
					clouds={weatherData.clouds_all}
					humidity={weatherData.humidity}
					direction={weatherData.wind_from_direction}
				/>
			</div>
			<div className="infos-wrapper">
				<SunRiseSet sunrise={weatherData.sunrise} sunset={weatherData.sunset} />
			</div>
			<Footer />
            {error && <div className="error-popup">{error}</div>}
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
