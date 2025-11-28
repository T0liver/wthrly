function Icon({ name = "cloud", size = 100 }: { name?: string; size?: number }) {
	return (
		<img
			src={`/icons/icons8-${name}-100.png`}
			alt="weather icon"
			width={size}
			height={size}
			style={{ display: "block", opacity: 0.9 }}
		/>
	);
}

export default Icon;