import { getWeatherIcon } from "../utils/weatherIcon";

function Icon({ name, wIcon, size }: { name?: string; wIcon?: string; size?: number }) {
	const wGIcon = getWeatherIcon(wIcon);
	name = wIcon ? wGIcon : name ? name : "sun";
	return (
		<img
			src={`/icons/icons8-${name}.png`}
			alt="weather icon"
			width={size}
			height={size}
			style={{ display: "block", opacity: 0.9 }}
		/>
	);
}

export default Icon;