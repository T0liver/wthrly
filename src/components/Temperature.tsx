import "../assets/temperature.css";
import Celsius from "./Celsius";
import CelsiusRadian from "./CelsiusRadian";
import Icon from "./Icon";

/**
 * @component Renders temperature with numeric, radian and icon representations.
 *
 * @props
 * value: number (required) — 0 — Temperature in Celsius.
 * icon: string (required) — '' — Weather icon identifier.
 * description: string (optional) — '' — Short visible weather description.
 *
 * @example
 * import React from "react";
 * import Temperature from "./Temperature";
 *
 * export default function Example() {
 *   return <Temperature value={21.5} icon="01d" description="Clear sky" />;
 * }
 *
 * @behavior
 * - Renders a numeric Celsius display and a radian-derived subvalue.
 * - Decorative icon is rendered with aria-hidden="true" by default.
 * - Description is visible text and available to screen readers.
 *
 * @edgecases
 * - value is NaN or non-finite: render a stable placeholder (e.g., "—").
 * - value undefined/null: component should tolerate and show placeholder.
 * - missing icon: render empty decorative element without throwing.
 * - extremely large magnitude: display value as-is (no clamping).
 *
 * @performance
 * - Pure presentational render; wrap with React.memo when props stable.
 *
 * @tests
 * - Unit: renders numeric Celsius and radian outputs for 21.5°C.
 * - Unit: displays description text when provided.
 * - Unit: shows placeholder for NaN/undefined values.
 * - A11y: icon element has aria-hidden=true.
 * - A11y: description is reachable by screen readers.
 *
 * @related
 * - Related: `Celsius`, `CelsiusRadian`, `Icon` components.
 */

function Temperature({ value, icon, description }: { value: number; icon: string; description: string }) {
    return (
        <div className="temperature-container">
            <Celsius tempC={value} size="70pt" weight={500} />
            <CelsiusRadian tempC={value} fractionDigits={6} size="26pt" weight={400} />
            <Icon wIcon={icon} size={80} />
            <div className="temperature-label">
                <span className="temperature-description">{description}</span>
            </div>
        </div>
    );
}

export default Temperature;