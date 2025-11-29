function WindDirectionIcon({ direction, size = 30 }: { direction: number, size?: number }) {
    return (
		<img
			src={`/icons/icons8-arrow.png`}
			alt="wind direction icon"
			width={size}
			height={size}
			style={{ display: "block", transform: `rotate(${direction}deg)` }}
		/>
	);
}

export default WindDirectionIcon;