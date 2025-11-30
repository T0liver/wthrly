import { useState, useEffect, useCallback } from "react";
/**
 * @component Hook to manage a persisted list of favourite city names.
 * @props
 * favorites: string[] (required) — [] — stored list of favourite city names.
 * addFavorite: (city: string) => void (required) — — add city if not already present.
 * removeFavorite: (city: string) => void (required) — — remove city if present.
 * isFavorite: (city: string) => boolean (required) — false — returns membership boolean.
 * @example
 * import React from "react";
 * import useFavorites from "./useFavourites";
 *
 * function FavouriteToggle({ city }: { city: string }) {
 *   const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
 *   const toggle = () => (isFavorite(city) ? removeFavorite(city) : addFavorite(city));
 *   return (
 *     <button
 *       aria-pressed={isFavorite(city)}
 *       onClick={toggle}
 *       title={isFavorite(city) ? "Remove favourite" : "Add favourite"}
 *     >
 *       {isFavorite(city) ? "★" : "☆"} {city}
 *     </button>
 *   );
 * }
 *
 * export default function App() {
 *   return <FavouriteToggle city="London" />;
 * }
 * @behavior
 * - Loads `favorites` from localStorage on mount via useEffect.
 * - Persists updates to localStorage after add/remove operations.
 * - Prevents duplicate entries when adding a city.
 * - Exposes stable callbacks via useCallback for stable references.
 * @edgecases
 * - Malformed JSON in localStorage may throw on JSON.parse.
 * - localStorage absent (SSR) causes no initial data; defaults to [].
 * - Adding an empty string is allowed; duplicates are prevented.
 * - Removing a non-existent city is a no-op.
 * @performance
 * Use callbacks returned are memoized; memoize consuming components when passing handlers.
 * @tests
 * - Unit: loads stored favourites and returns correct initial array.
 * - Unit: addFavorite appends and persists new city.
 * - Unit: removeFavorite removes and persists correctly.
 * - Unit: isFavorite returns correct booleans for present/absent cities.
 * - A11y: button uses aria-pressed and accessible title.
 * @related
 * - Related hook: `useFavourites` / component `Favourite` in components folder.
 */
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
