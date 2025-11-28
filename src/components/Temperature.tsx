import "../assets/temperature.css";
import { gradToRad } from "../utils/numbers";
import Icon from "./Icon";

function Temperature({ value, icon }: { value: number; icon: string }) {
    return (
        <div className="temperature-container">
            <div className="temperature-celsius">
                <span className="temperature-value">{value}</span>
                <span className="temperature-unit">°C</span>
            </div>
            <div className="temperature-radC">
                <span className="radCtemp-value">{gradToRad(value, 6)}</span>
                <span className="radCtemp-unit">radC</span>
            </div>
            <Icon wIcon={icon} size={80} />
        </div>
    );
}

export default Temperature;