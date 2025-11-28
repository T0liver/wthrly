import "../assets/card.css";
import Icon from "./Icon";
import { formatNumber, gradToRad } from "../utils/Numbers";
import { CSSProperties } from "preact";

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
            <div className="radC">{formatNumber(gradToRad(tempC), locale, 4)} radC</div>
			<div className="spacer" />
			<div aria-hidden><Icon name={icon} /></div>
            <div className="spacer" />
		</div>
	);
}
