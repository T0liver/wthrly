import useFavorites from "../utils/useFavourites";
import { useWeather } from "../context/WeatherContext";
import Icon from "./Icon";

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
