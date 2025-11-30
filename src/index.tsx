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
import Clock from "./components/Clock";
import VerticalLine from "./components/VerticalLine";

/**
 * @component Main weather UI that composes header, data, and controls.
 * @props — none
 * @example
 * // Minimal usage inside application root
 * import { render } from "preact";
 * import { WeatherProvider } from "./context/WeatherContext";
 * import WeatherApp from "./index";
 *
 * render(
 *   <WeatherProvider>
 *     <WeatherApp />
 *   </WeatherProvider>,
 *   document.getElementById("app")
 * );
 * @behavior
 * - Reads weather state from `useWeather` context.
 * - Renders a `Loading` view while data is unavailable.
 * - Toggles sidebar state with local UI state.
 * - Shows a transient error popup when `error` exists.
 * @edgecases
 * - Missing context or `weatherData` -> shows `Loading`.
 * - `error` present -> displays error popup string.
 * - No render target (`#app`) -> host DOM error.
 * - Extremely large payloads -> longer render time.
 * @performance
 * - Keep child components memoized; avoid unnecessary re-renders.
 * @tests
 * - Unit: renders `Loading` when context.isLoading true.
 * - Unit: renders temperature and location when data present.
 * - Interaction: hamburger toggles sidebar state.
 * - A11y: hamburger reachable by keyboard (Enter/Space).
 * - Snapshot: main layout with typical data.
 * @related
 * - `useWeather`, `WeatherProvider`, `Loading`, `Hamburger`
 */
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
			<Clock />
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
			<VerticalLine />
			<Footer />
            {error && <div className="error-popup">{error}</div>}
		</div>
	);
}

/**
 * @component App wrapper that provides weather context to the tree.
 * @props — none
 * @example
 * // Minimal root render of the provider wrapper
 * import { render } from "preact";
 * import App from "./index";
 *
 * render(<App />, document.getElementById("app"));
 * @behavior
 * - Wraps the application with `WeatherProvider`.
 * - No UI of its own; purely composition/root mounting.
 * @edgecases
 * - Multiple provider instances -> duplicated fetches/state.
 * - Missing `WeatherProvider` -> child components may error.
 * @performance
 * - Lightweight; ensure provider value is stable to prevent re-renders.
 * @tests
 * - Unit: renders children inside provider without throwing.
 * - Integration: full app renders and fetches initial data.
 * @related
 * - `WeatherProvider`, `WeatherApp`
 */
function App() {
	return (
		<WeatherProvider>
			<WeatherApp />
		</WeatherProvider>
	);
}

render(<App />, document.getElementById('app'));
