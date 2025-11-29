import { useState, useEffect, useCallback } from "react";

const useFavorites = () => {
	const [favorites, setFavorites] = useState<string[]>([]);

	useEffect(() => {
		const storedFavorites = localStorage.getItem("favorites");
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites));
		}
	}, []);

	const updateFavorites = useCallback((newFavorites: string[]) => {
		setFavorites(newFavorites);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	}, []);

	const addFavorite = useCallback(
		(city: string) => {
			if (!favorites.includes(city)) {
				const newFavorites = [...favorites, city];
				updateFavorites(newFavorites);
			}
		},
		[favorites, updateFavorites]
	);

	const removeFavorite = useCallback(
		(city: string) => {
			const newFavorites = favorites.filter((fav) => fav !== city);
			updateFavorites(newFavorites);
		},
		[favorites, updateFavorites]
	);

	const isFavorite = useCallback(
		(city: string) => {
			return favorites.includes(city);
		},
		[favorites]
	);

	return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;
