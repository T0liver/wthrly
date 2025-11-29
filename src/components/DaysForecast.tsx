import "../assets/daysforecast.css";
import { useWeather } from "../context/WeatherContext";
import { getDayName } from "../utils/dayName";
import { getWeatherIcon } from "../utils/weatherIcon";
import Card from "./Card";

function DaysForecast() {
	const { forecastData } = useWeather();

	return (
		<div className="days-forecast">
			{forecastData?.map(day => (
				<Card
					key={day.dt}
					day={getDayName(new Date(day.dt * 1000))}
					tempC={day.temp}
					icon={getWeatherIcon(day.icon)}
				/>
			))}
		</div>
	);
}

export default DaysForecast;