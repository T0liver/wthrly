function gradToRad(grad: number, fractionDigits = 8) {
    return Number((grad * (Math.PI / 180)).toFixed(fractionDigits));
}

export { gradToRad };

function celciusToFahrenheit(celsius: number, fractionDigits = 3) {
	return Number(((celsius * 1.8) + 32).toFixed(fractionDigits));
}

export { celciusToFahrenheit };

function celsiusToKelvin(celsius: number, fractionDigits = 2) {
	return Number((celsius + 273.15).toFixed(fractionDigits));
}

export { celsiusToKelvin };

function celsiusToReaumur(celsius: number, fractionDigits = 3) {
	return Number((celsius / 1.25).toFixed(fractionDigits));
}

export { celsiusToReaumur };

function mpsToMph(mps: number, fractionDigits = 3) {
	return Number((mps * 2.236936).toFixed(fractionDigits));
}

export { mpsToMph };