import "../assets/temperature.css"
import { gradToRad } from "../utils/numbers";

/**
 * @component Show temperature in radians derived from Celsius.
 * @props
 * - tempC: number (required) — — Temperature in Celsius to convert.
 * - fractionDigits: number (optional) — 4 — Decimal places for radian value.
 * - size: string (optional) — "14pt" — CSS font-size for numeric value.
 * - weight: number (optional) — 300 — Font-weight for the display.
 * @example
 * import React from "react";
 * import CelsiusRadian from "./CelsiusRadian";
 *
 * export default function Example() {
 *   return <CelsiusRadian tempC={20} fractionDigits={3} size="16pt" />;
 * }
 * @behavior
 * - Converts Celsius to radians using `gradToRad` helper.
 * - Formats result with Number.toFixed(fractionDigits).
 * - Renders unit `radC` scaled by `size`.
 * - Non-interactive; not keyboard-focusable.
 * @edgecases
 * - Non-finite `tempC` yields `NaN` or `Infinity` output.
 * - Negative `fractionDigits` throws RangeError via toFixed.
 * - Extremely large values may overflow layout.
 * - Invalid `size` strings may not scale unit correctly.
 * @performance
 * - Keep inputs stable; memoize if used in lists.
 * @tests
 * - Renders converted radian value with specified fractionDigits.
 * - Handles NaN and extreme fractionDigits gracefully.
 * - Verifies unit text `radC` is present and scaled.
 * @related
 * - `Celsius` — displays Celsius numeric value.
 */
function CelsiusRadian({ tempC, fractionDigits = 4, size = "14pt", weight = 300 }: {tempC: number, fractionDigits?: number, size?: string, weight?: number}) {
    return <div
        className="radC"
        style={{ fontWeight: weight }}>
            <span className="radC-value" style={{ fontSize: size }}>{gradToRad(tempC).toFixed(fractionDigits)}</span>
            <span className="radC-unit" style={{ fontSize: `calc(${size} * 0.6)` }}> radC</span>
    </div>
}

export default CelsiusRadian;
