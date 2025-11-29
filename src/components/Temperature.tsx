import "../assets/temperature.css";
import CelsiusRadian from "./CelsiusRadian";
import Icon from "./Icon";

function Temperature({ value, icon, description }: { value: number; icon: string; description: string }) {
    return (
        <div className="temperature-container">
            <div className="temperature-celsius">
                <span className="temperature-value">{value}</span>
                <span className="temperature-unit">°C</span>
            </div>
            <CelsiusRadian tempC={value} fractionDigits={6} size="26pt" weight={400} />
            <Icon wIcon={icon} size={80} />
            <div className="temperature-label">
                <span className="temperature-description">{description}</span>
            </div>
        </div>
    );
}

export default Temperature;