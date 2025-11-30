import { useState, useEffect } from "preact/hooks";
import "../assets/sidebar.css";
import City from "./City";
import { useWeather } from "../context/WeatherContext";
import SideCard from "./SideCard";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * @component One-line component purpose.
 * SideBar — slide-in panel that lists favorite cities and a side card.
 *
 * @props
 * isOpen: boolean (required) — none — controls sidebar visibility.
 * onClose: () => void (required) — none — callback to close the sidebar.
 *
 * @example
 * import { useState } from "preact/hooks";
 * import SideBar from "./SideBar";
 *
 * function App() {
 *   const [open, setOpen] = useState(false);
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Open sidebar</button>
 *       <SideBar isOpen={open} onClose={() => setOpen(false)} />
 *     </>
 *   );
 * }
 *
 * @behavior
 * - Reads `localStorage.favorites` when `isOpen` becomes true.
 * - Renders a list of favorite city entries if present, else fallback text.
 * - Calls `setCity(cityName)` from WeatherContext when a city is selected.
 * - Calls `onClose()` after city selection and when close button clicked.
 * - Uses native button for close control (keyboard/focusable by default).
 *
 * @edgecases
 * - Missing `favorites` key in localStorage results in empty list.
 * - Invalid JSON in `favorites` will throw unless sanitized before parse.
 * - `setCity` undefined in context will cause a runtime error.
 * - Rapid toggle of `isOpen` may race localStorage read updates.
 *
 * @performance
 * Keep `favorites` stable and memoize parent handlers to avoid re-renders.
 *
 * @tests
 * - Unit: renders header and close button when `isOpen` true.
 * - Unit: reads localStorage and renders parsed favorites array.
 * - Unit: clicking a city calls `setCity` and `onClose`.
 * - A11y: close button is focusable and has discernible label.
 * - Edge: invalid JSON in localStorage does not crash (sanitize test).
 *
 * @migration
 * none — no breaking API changes from prior versions.
 *
 * @related
 * useWeather() hook — provides `setCity`; `SideCard` — companion widget.
 */
export default function SideBar({ isOpen, onClose }: SideBarProps) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const { setCity } = useWeather();

    useEffect(() => {
        if (isOpen) {
            const storedFavorites = localStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        }
    }, [isOpen]);

    const handleCitySelect = (cityName: string) => {
        setCity(cityName);
        onClose();
    };

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>
            <div className="sidebar-content">
                <div>
                    <h3>Fvrt Ctys</h3>
                    <div className="city-list">
                        {favorites.length > 0 ? (
                            favorites.map((city) => <City key={city} name={city} onClick={handleCitySelect} />)
                        ) : (
                            <p>No favorite cities yet.</p>
                        )}
                    </div>
                </div>
                <div className="sidebar-card-wrapper">
                    <SideCard />
                </div>
            </div>
        </div>
    );
}