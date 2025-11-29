import "../assets/temperature.css"
import { formatNumber, gradToRad } from "../utils/numbers";

function CelsiusRadian({ tempC, fractionDigits = 4, size = "14pt", weight = 300 }: {tempC: number, fractionDigits?: number, size?: string, weight?: number}) {
    return <div
        className="radC"
        style={{ fontWeight: weight }}>
            <span className="radC-value" style={{ fontSize: size }}>{formatNumber(gradToRad(tempC), "de-DE", fractionDigits)}</span>
            <span className="radC-unit" style={{ fontSize: `calc(${size} * 0.6)` }}> radC</span>
    </div>
}

export default CelsiusRadian;
