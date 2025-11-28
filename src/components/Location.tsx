import { useState, useRef } from "react";
import "../assets/location.css";
import Icon from "./Icon";
import { useWeather } from "../context/WeatherContext";

function Location({ name: initialName }: { name?: string }) {
	const [name, setName] = useState(initialName);
	const inputRef = useRef<HTMLInputElement>(null);
	const { fetchWeatherData } = useWeather();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
	};

	const handleSearch = () => {
		if (name) {
			fetchWeatherData(name);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch();
			inputRef.current?.blur();
		}
	};

	return (
		<div className="location-container">
			<Icon name="location-pin" size={30} />
			<input
				ref={inputRef}
				type="text"
				className="location-name"
				value={name}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder="search for a city"
			/>
		</div>
	);
}

export default Location;
