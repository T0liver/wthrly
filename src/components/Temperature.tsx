import "../assets/temperature.css";
import { gradToRad } from "../utils/Numbers";

function Temperature({ value }: { value: number }) {
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
        </div>
    );
}

export default Temperature;