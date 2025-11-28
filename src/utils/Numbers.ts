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

function celciusToFahrenheit(celsius: number) {
	return (celsius * 1.8) + 32;
}

export { celciusToFahrenheit };

function celsiusToKelvin(celsius: number) {
	return celsius + 273.15;
}

export { celsiusToKelvin };

function celsiusToReaumur(celsius: number) {
	return celsius / 1.25;
}

export { celsiusToReaumur };