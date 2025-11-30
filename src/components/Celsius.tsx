import "../assets/temperature.css";

/**
 * @component Render a formatted Celsius temperature with unit.
 * @props
 * - tempC: number (required) — — Temperature in Celsius for display.
 * - size: string (optional) — "26pt" — CSS font-size for the numeric value.
 * - weight: number (optional) — 600 — Font-weight used for the value.
 * - fractionDigits: number (optional) — 0 — Decimal places for formatting.
 * @example
 * import React from "react";
 * import Celsius from "./Celsius";
 *
 * export default function Example() {
 *   return (
 *     <div>
 *       <Celsius tempC={21.37} fractionDigits={1} size="24pt" />
 *     </div>
 *   );
 * }
 * @behavior
 * - Formats value using Number.toFixed(fractionDigits).
 * - Renders unit "˚C" scaled relative to `size`.
 * - Applies inline styles for fontSize and fontWeight.
 * - Non-interactive; not focusable by default.
 * @edgecases
 * - tempC === NaN => displays "NaN" from toFixed.
 * - Negative fractionDigits throws RangeError via toFixed.
 * - Non-finite tempC shows `Infinity` or `-Infinity`.
 * - Invalid `size` strings may not scale unit correctly.
 * @performance
 * - Keep props stable and wrap with React.memo if needed.
 * @tests
 * - Renders formatted value and unit with given fractionDigits.
 * - Renders correct fontSize and fontWeight inline styles.
 * - Handles NaN and extreme fractionDigits as edge cases.
 * - Accessibility: numeric value visible to screen readers.
 * @related
 * - `CelsiusRadian` — radial visualization of temperature.
 */
function Celsius({ tempC, size = "26pt", weight = 600, fractionDigits = 0 }: { tempC: number; size: string; weight: number; fractionDigits?: number }) {
    return (
        <div className="temperature-celsius" style={{ fontWeight: weight }}>
            <span className="temperature-value" style={{ fontSize: size }}>{tempC.toFixed(fractionDigits)}</span>
            <span className="temperature-unit" style={{ fontSize: `calc(${size} * 0.6)` }}>˚C</span>
        </div>
    );
}

export default Celsius;