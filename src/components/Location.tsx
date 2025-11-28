import "../assets/location.css";
import Icon from "./Icon";

function Location({ name }: { name?: string }) {
	return (
		<div className="location-container">
			<Icon name="air" size={30} />
			<span className="location-name">{name}</span>
		</div>
	);
}

export default Location;
