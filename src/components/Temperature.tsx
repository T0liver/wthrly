import "../assets/temperature.css";
import Celsius from "./Celsius";
import CelsiusRadian from "./CelsiusRadian";
import Icon from "./Icon";

function Temperature({ value, icon, description }: { value: number; icon: string; description: string }) {
    return (
        <div className="temperature-container">
            <Celsius tempC={value} size="70pt" weight={500} />
            <CelsiusRadian tempC={value} fractionDigits={6} size="26pt" weight={400} />
            <Icon wIcon={icon} size={80} />
            <div className="temperature-label">
                <span className="temperature-description">{description}</span>
            </div>
        </div>
    );
}

export default Temperature;