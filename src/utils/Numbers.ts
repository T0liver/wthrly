function formatNumber(
	value: number,
	locale = "de-DE",
	maximumFractionDigits = 1
) {
	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: 1,
		maximumFractionDigits,
	}).format(value);
}

export { formatNumber };

function gradToRad(grad: number) {
    return grad * (Math.PI / 180);
}

export { gradToRad };