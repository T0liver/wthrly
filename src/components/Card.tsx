import "../assets/card.css";
import Icon from "./Icon";
import { formatNumber, gradToRad } from "../utils/numbers";
import { CSSProperties } from "preact";
import CelsiusRadian from "./CelsiusRadian";

interface CardProps {
	day?: string;
	tempC: number;
	icon?: string;
	locale?: string;
	className?: string;
    style?: CSSProperties;
}

export default function Card({
	day,
	tempC,
	icon = "cloud",
	locale = "de-DE",
	className,
    style
}: CardProps) {
	return (
		<div className={`card ${className || ""}`} style={style}>
			<div className="day">{day}</div>
			<div className="temp">{formatNumber(tempC, locale, 1)} °C</div>
			<CelsiusRadian tempC={tempC}  />
			<div className="spacer" />
			<div aria-hidden><Icon name={icon} /></div>
            <div className="spacer" />
		</div>
	);
}
