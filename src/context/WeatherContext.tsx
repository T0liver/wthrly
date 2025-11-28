import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
	useCallback,
} from "react";
import { getWeatherData, UIData } from "../services/weatherService";

interface WeatherContextType {
	weatherData: UIData | null;
	isLoading: boolean;
	error: string | null;
	fetchWeatherData: (city: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
	const [weatherData, setWeatherData] = useState<UIData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchWeatherData = useCallback(async (city: string) => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await getWeatherData(city);
			setWeatherData(data);
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
			value={{ weatherData, isLoading, error, fetchWeatherData }}
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
