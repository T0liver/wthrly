/**
 * Convert degrees to radians with fixed decimal precision.
 *
 * @props
 * grad: number (required) — N/A — degrees to convert.
 * fractionDigits: number (optional) — 8 — decimal places in result.
 *
 * @example
 * const rad = gradToRad(180); // 3.14159265
 *
 * @behavior
 * - Pure function, no side effects.
 * - Rounds result to specified fraction digits.
 *
 * @edgecases
 * - NaN or non-finite input returns NaN.
 * - Very large magnitude may lose integer precision.
 *
 * @performance
 * Fast, constant-time; memoize if called with identical pairs repeatedly.
 *
 * @tests
 * - 0 -> 0
 * - 180 -> approx Math.PI
 * - fractionDigits controls decimal places
 *
 * @related
 * - celsiusToKelvin, celciusToFahrenheit, mpsToMph
 */
function gradToRad(grad: number, fractionDigits = 8) {
    return Number((grad * (Math.PI / 180)).toFixed(fractionDigits));
}

export { gradToRad };

/**
 * Convert Celsius to Fahrenheit.
 *
 * @props
 * celsius: number (required) — N/A — temperature in degrees Celsius.
 * fractionDigits: number (optional) — 3 — decimal places in result.
 *
 * @example
 * const f = celciusToFahrenheit(0); // 32.000
 *
 * @behavior
 * - Pure numeric conversion, no I/O.
 * - Applies standard formula (C * 1.8) + 32.
 *
 * @edgecases
 * - NaN or non-finite input returns NaN.
 * - Rounding may hide tiny floating errors.
 *
 * @performance
 * Constant-time arithmetic; negligible cost.
 *
 * @tests
 * - 0°C -> 32°F
 * - 100°C -> 212°F
 * - fractionDigits changes precision
 *
 * @related
 * - celsiusToKelvin, celsiusToReaumur
 */
function celciusToFahrenheit(celsius: number, fractionDigits = 3) {
    return Number(((celsius * 1.8) + 32).toFixed(fractionDigits));
}

export { celciusToFahrenheit };

/**
 * Convert Fahrenheit to Celsius.
 *
 * @props
 * fahrenheit: number (required) — N/A — temperature in degrees Fahrenheit.
 * fractionDigits: number (optional) — 3 — decimal places in result.
 *
 * @example
 * const c = fahrenheitToCelsius(32); // 0.000
 *
 * @behavior
 * - Pure numeric conversion, no I/O.
 * - Applies standard formula (F - 32) / 1.8.
 *
 * @edgecases
 * - NaN or non-finite input returns NaN.
 * - Rounding may hide tiny floating errors.
 *
 * @performance
 * Constant-time arithmetic; negligible cost.
 *
 * @tests
 * - 32°F -> 0°C
 * - 212°F -> 100°C
 * - fractionDigits changes precision
 *
 * @related
 * - celsiusToKelvin, celsiusToReaumur
 */
function fahrenheitToCelsius(fahrenheit: number, fractionDigits = 3) {
    return Number(((fahrenheit - 32) / 1.8).toFixed(fractionDigits));
}

export { fahrenheitToCelsius };

/**
 * Convert Celsius to Kelvin.
 *
 * @props
 * celsius: number (required) — N/A — temperature in degrees Celsius.
 * fractionDigits: number (optional) — 2 — decimal places in result.
 *
 * @example
 * const k = celsiusToKelvin(0); // 273.15
 *
 * @behavior
 * - Pure function, adds 273.15 to Celsius.
 * - Returns rounded numeric value.
 *
 * @edgecases
 * - Negative Celsius handled normally (below 273.15).
 * - NaN or non-finite input returns NaN.
 *
 * @performance
 * Constant-time arithmetic; no allocations.
 *
 * @tests
 * - 0°C -> 273.15K
 * - -273.15°C -> 0K
 *
 * @related
 * - celciusToFahrenheit, celsiusToReaumur
 */
function celsiusToKelvin(celsius: number, fractionDigits = 2) {
    return Number((celsius + 273.15).toFixed(fractionDigits));
}

export { celsiusToKelvin };

/**
 * Convert Celsius to Réaumur.
 *
 * @props
 * celsius: number (required) — N/A — temperature in degrees Celsius.
 * fractionDigits: number (optional) — 3 — decimal places in result.
 *
 * @example
 * const r = celsiusToReaumur(20); // 16.000
 *
 * @behavior
 * - Pure conversion dividing Celsius by 1.25.
 * - Returns rounded numeric value.
 *
 * @edgecases
 * - NaN or non-finite input returns NaN.
 * - Very small/large values may lose precision due to rounding.
 *
 * @performance
 * Constant-time math; trivial CPU cost.
 *
 * @tests
 * - 0°C -> 0°Ré
 * - 100°C -> 80°Ré
 *
 * @related
 * - celsiusToKelvin, celciusToFahrenheit
 */
function celsiusToReaumur(celsius: number, fractionDigits = 3) {
    return Number((celsius / 1.25).toFixed(fractionDigits));
}

export { celsiusToReaumur };

/**
 * Convert meters per second to miles per hour.
 *
 * @props
 * mps: number (required) — N/A — speed in meters per second.
 * fractionDigits: number (optional) — 3 — decimal places in result.
 *
 * @example
 * const mph = mpsToMph(1); // ~2.237
 *
 * @behavior
 * - Pure arithmetic conversion using factor 2.236936.
 * - Rounds to specified precision.
 *
 * @edgecases
 * - Negative speeds are preserved (directional).
 * - NaN or non-finite input returns NaN.
 *
 * @performance
 * Constant-time numeric operation; highly performant.
 *
 * @tests
 * - 0 m/s -> 0 mph
 * - 1 m/s -> ~2.236936 mph
 *
 * @related
 * - gradToRad (unit conversions)
 */
function mpsToMph(mps: number, fractionDigits = 3) {
    return Number((mps * 2.236936).toFixed(fractionDigits));
}

export { mpsToMph };