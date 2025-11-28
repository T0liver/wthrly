import { useState, useRef } from "react";
import "../assets/location.css";
import Icon from "./Icon";

function Location({ name: initialName }: { name?: string }) {
	const [name, setName] = useState(initialName);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.currentTarget.value);
	};

	const handleSearch = () => {
		// Later will call something
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch();
			inputRef.current?.blur();
		}
	};

	return (
		<div className="location-container">
			<Icon name="air" size={30} />
			<input
				ref={inputRef}
				type="text"
				className="location-name"
				value={name}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				placeholder="Search for a city"
			/>
		</div>
	);
}

export default Location;
