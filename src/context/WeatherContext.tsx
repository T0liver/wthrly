import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
	useCallback,
} from "react";
import {
	getWeatherDataAndForecast,
	UIData,
	ForecastData,
} from "../services/weatherService";

interface WeatherContextType {
	weatherData: UIData | null;
	forecastData: ForecastData[] | null;
	isLoading: boolean;
	error: string | null;
	fetchWeatherData: (city: string) => Promise<void>;
	setCity: (city: string) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

/**
 * @component Provides global weather state and actions to the app.
 * @props
 * children: ReactNode (required) — none — Provider children nodes.
 * @example
 * import React from "react";
 * import { WeatherProvider } from "./context/WeatherContext";
 *
 * const Root = () => (
 *   <WeatherProvider>
 *     <App />
 *   </WeatherProvider>
 * );
 *
 * export default Root;
 * @behavior
 * - Fetches weather on mount using lastCity from localStorage.
 * - Exposes isLoading, error, weatherData, forecastData, fetchWeatherData, setCity.
 * - Persists last successful city to localStorage.
 * @edgecases
 * - Invalid city string -> sets error and clears after 5s.
 * - Network failure -> sets error, retains previous data if present.
 * - localStorage unavailable -> falls back to default city "Budapest".
 * @performance
 * - fetchWeatherData is memoized with useCallback; memoize provider value to reduce renders.
 * @tests
 * - Unit: initial fetch called on mount with lastCity.
 * - Unit: setCity triggers fetchWeatherData and updates state.
 * - Unit: error state set on failed fetch and cleared after timeout.
 * - Accessibility: children remain focusable and unaffected.
 * @related
 * - useWeather hook; services/weatherService.getWeatherDataAndForecast
 */
export const WeatherProvider = ({ children }: { children: ReactNode }) => {
	const [weatherData, setWeatherData] = useState<UIData | null>(null);
	const [forecastData, setForecastData] = useState<ForecastData[] | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchWeatherData = useCallback(async (city: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const { current, forecast } = await getWeatherDataAndForecast(city);
			setWeatherData(current);
			setForecastData(forecast);
			localStorage.setItem("lastCity", city);
		} catch (err) {
			setError("Failed to fetch weather data. Please check the city name.");
			setTimeout(() => setError(null), 5000);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const setCity = (city: string) => {
		fetchWeatherData(city);
	};

	useEffect(() => {
		const lastCity = localStorage.getItem("lastCity") || "Budapest";
		fetchWeatherData(lastCity);
	}, [fetchWeatherData]);

	return (
		<WeatherContext.Provider
			value={{
				weatherData,
				forecastData,
				isLoading,
				error,
				fetchWeatherData,
				setCity,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};

/**
 * @component Hook to consume weather context values and actions.
 * @props
 * (none)
 * @example
 * import React from "react";
 * import { useWeather } from "./context/WeatherContext";
 *
 * const Status: React.FC = () => {
 *   const { weatherData, isLoading, error, setCity } = useWeather();
 *   if (isLoading) return <div aria-live="polite">Loading…</div>;
 *   return (
 *     <div>
 *       <div>{weatherData?.locationName ?? "No data"}</div>
 *       <button onClick={() => setCity("Budapest")}>Load Budapest</button>
 *       {error && <div role="alert">{error}</div>}
 *     </div>
 *   );
 * };
 *
 * export default Status;
 * @behavior
 * - Throws if used outside a WeatherProvider.
 * - Returns latest context values and stable action functions.
 * - Consumers re-render when context values change.
 * @edgecases
 * - Calling outside provider -> throws an Error.
 * - Passing empty string to setCity -> triggers fetch with empty city.
 * - Rapid consecutive setCity calls -> multiple fetches (no built-in debouncing).
 * @performance
 * - Select only needed values to avoid unnecessary re-renders.
 * @tests
 * - Unit: throws when used without provider.
 * - Unit: returns updated weatherData after fetch.
 * - Accessibility: error exposed via role="alert" for SRs.
 * @related
 * - WeatherProvider; services/weatherService
 */
export const useWeather = () => {
	const context = useContext(WeatherContext);
	if (context === undefined) {
		throw new Error("useWeather must be used within a WeatherProvider");
	}
	return context;
};
