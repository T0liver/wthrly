import "../assets/airconditions.css";
import AirConditionElement from "./AirConditionElement";
import DetailsHeader from "./DetailsHeader";
import WindDirection from "./WindDirection";

/**
 * @component Display a set of environmental air condition metrics.
 * @props
 * - realFeel: number (optional) — undefined — Apparent temperature in Celsius.
 * - wind: number (optional) — undefined — Wind speed in meters per second.
 * - clouds: number (optional) — undefined — Cloudiness percentage 0–100.
 * - humidity: number (optional) — undefined — Relative humidity percentage.
 * - direction: number (optional) — undefined — Wind direction in degrees (0–360).
 * @example
 * import React from "react";
 * import AirConditions from "./AirConditions";
 *
 * <AirConditions realFeel={21.4} wind={3.2} clouds={45} humidity={60} direction={135} />
 * @behavior
 * - Renders a header and multiple `AirConditionElement` items.
 * - Omits metric text when a prop is undefined.
 * - Renders `WindDirection` visual for the `direction` prop.
 * - Non-interactive; container is not keyboard-focusable.
 * @edgecases
 * - direction outside 0–360 may render incorrectly.
 * - Non-finite numbers produce invalid formatting.
 * - Missing metrics display empty values.
 * - Very large numbers display raw values.
 * @performance
 * - Use memoization to avoid re-renders on unchanged props.
 * @tests
 * - Renders header and expected metric elements.
 * - Omits numeric text when props are undefined.
 * - Passes `direction` through to `WindDirection`.
 * - Accessibility: header is exposed to screen readers.
 * - Edge: supply NaN and out-of-range numbers.
 * @related
 * - `AirConditionElement` — single metric; `WindDirection` — direction indicator.
 */
function AirConditions({ realFeel, wind, clouds, humidity, direction }: { realFeel?: number, wind?: number, clouds?: number, humidity?: number, direction?: number }) {
    return <div className="air-conditions-container">
        <DetailsHeader title="Ar Cndtns" />
        <AirConditionElement label="Rl Fl" value={realFeel} unit="˚C" iconName="thermometer" />
        <AirConditionElement label="Wnd" value={wind} unit="m/s" iconName="wind" />
        <AirConditionElement label="Clds" value={clouds} unit="%" iconName="cloud" />
        <AirConditionElement label="Hmdty" value={humidity} unit="%" iconName="wet" />
        <WindDirection direction={direction} />
    </div>;
}

export default AirConditions;