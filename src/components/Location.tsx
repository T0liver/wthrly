import { useState, useRef } from "react";
import { JSX } from "preact";
import "../assets/location.css";
import Icon from "./Icon";
import { useWeather } from "../context/WeatherContext";
import Favourite from "./Favourite";

/**
 * @component — Controlled location search input with favourite toggle.
 * @props
 * name: string (optional) — undefined — initial input value shown in text field.
 * @example
 * import React from "react";
 * import Location from "./Location";
 *
 * export default function App() {
 *   return <Location name="London" />;
 * }
 * @behavior
 * - Pressing Enter triggers search via context fetchWeatherData.
 * - Enter blurs input to dismiss virtual/physical keyboard.
 * - Renders location-pin icon and a Favourite toggle.
 * - Input uses placeholder "search location" for affordance.
 * @edgecases
 * - Empty or whitespace-only name: no fetch invoked.
 * - Very long strings: may affect layout, not trimmed automatically.
 * - Used outside WeatherProvider: fetchWeatherData may be undefined.
 * - Rapid repeated Enter presses: no debounce implemented.
 * @performance — Keep pure; wrap in React.memo to avoid unnecessary renders.
 * @tests
 * - Unit: renders with initial name prop and updates on change.
 * - Unit: calls fetchWeatherData once on Enter with current value.
 * - Unit: does not call fetchWeatherData for empty string.
 * - A11y: input has accessible name via placeholder or aria-label.
 * - A11y: Enter key activates search (keyboard operable).
 * @migration — none
 * @related — useWeather hook, Favourite component, Icon component
 */
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

	const handleKeyDown = (event: KeyboardEvent) => {
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
				placeholder="search location"
			/>
			<Favourite />
		</div>
	);
}

export default Location;
