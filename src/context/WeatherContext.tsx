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
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

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
		} catch (err) {
			setError("Failed to fetch weather data. Please check the city name.");
			setTimeout(() => setError(null), 5000);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchWeatherData("London");
	}, [fetchWeatherData]);

	return (
		<WeatherContext.Provider
			value={{
				weatherData,
				forecastData,
				isLoading,
				error,
				fetchWeatherData,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeather = () => {
	const context = useContext(WeatherContext);
	if (context === undefined) {
		throw new Error("useWeather must be used within a WeatherProvider");
	}
	return context;
};
