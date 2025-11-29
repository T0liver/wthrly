import "../assets/temperature.css";

function Celsius({ tempC, size = "26pt", weight = 600, fractionDigits = 0 }: { tempC: number; size: string; weight: number; fractionDigits?: number }) {
    return (
        <div className="temperature-celsius" style={{ fontWeight: weight }}>
            <span className="temperature-value" style={{ fontSize: size }}>{tempC.toFixed(fractionDigits)}</span>
            <span className="temperature-unit" style={{ fontSize: `calc(${size} * 0.6)` }}>˚C</span>
        </div>
    );
}

export default Celsius;