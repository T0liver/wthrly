import useFavorites from "../utils/useFavourites";
import { useWeather } from "../context/WeatherContext";
import Icon from "./Icon";
import "../assets/favourite.css";

/**
 * @component Toggle favorite state for the current weather location.
 * @props
 * - none: none (optional) — — No props; reads WeatherContext instead.
 * @example
 * import React from 'react';
 * import Favourite from './components/Favourite';
 *
 * function App() {
 *   return <Favourite />;
 * export default App;
 * @behavior
 * - Toggles favorite via useFavourites hook.
 * - Updates button aria-label to reflect state.
 * - Uses native <button>; supports keyboard activation.
 * @edgecases
 * - weatherData null: component returns null.
 * - missing name: toggle is no-op to avoid errors.
 * - hook failure: underlying hook errors propagate.
 * @performance
 * - Keep pure; wrap in React.memo to avoid re-renders.
 * @tests
 * - unit: clicking toggles add/removeFavorite called.
 * - unit: aria-label matches favorite state.
 * - a11y: Enter/Space activate the button.
 * @related
 * - useFavourites hook, WeatherContext
 */
function Favourite() {
	const { weatherData } = useWeather();
	const { isFavorite, addFavorite, removeFavorite } = useFavorites();

	if (!weatherData) {
		return null;
	}

	const { name } = weatherData;
	const favorite = isFavorite(name);

	const handleToggleFavorite = () => {
		if (favorite) {
			removeFavorite(name);
		} else {
			addFavorite(name);
		}
	};

	return (
		<button
			onClick={handleToggleFavorite}
			className="favourite-button"
			aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
		>
			<Icon name={favorite ? "hearth-filled" : "hearth"} size={24} />
		</button>
	);
}

export default Favourite;
