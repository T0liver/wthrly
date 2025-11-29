import "../assets/card.css";
import Icon from "./Icon";
import { formatNumber } from "../utils/numbers";
import { CSSProperties } from "preact";
import CelsiusRadian from "./CelsiusRadian";
import Celsius from "./Celsius";

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
			<Celsius tempC={tempC} size="26pt" weight={400} fractionDigits={1} />
			<CelsiusRadian tempC={tempC}  />
			<div className="spacer" />
			<div aria-hidden><Icon name={icon} /></div>
            <div className="spacer" />
		</div>
	);
}
