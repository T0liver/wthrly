import { useState, useEffect } from "preact/hooks";
import "../assets/sidebar.css";
import City from "./City";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            const storedFavorites = localStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        }
    }, [isOpen]);

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>
            <div className="sidebar-content">
                <h3>Fvrt Ctys</h3>
                <div className="city-list">
                    {favorites.length > 0 ? (
                        favorites.map((city) => <City key={city} name={city} />)
                    ) : (
                        <p>No favorite cities yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
