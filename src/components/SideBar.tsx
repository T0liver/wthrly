import { useState, useEffect } from "preact/hooks";
import "../assets/sidebar.css";
import City from "./City";
import { useWeather } from "../context/WeatherContext";
import SideCard from "./SideCard";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

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