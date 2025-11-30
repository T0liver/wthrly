import "../assets/airconditions.css";
import Icon from "./Icon";

/**
 * @component Render a small labeled air-condition metric with icon and unit.
 * @props
 * - label: string (required) — — Visible label for the metric.
 * - value: number (optional) — undefined — Numeric metric, formatted to one decimal.
 * - unit: string (required) — — Unit string displayed after the value.
 * - iconName: string (required) — — Icon key passed to `Icon` component.
 * @example
 * import React from "react";
 * import AirConditionElement from "./AirConditionElement";
 *
 * export default function Example() {
 *   return (
 *     <div>
 *       <AirConditionElement label="Humidity" value={72.3} unit="%" iconName="humidity" />
 *     </div>
 *   );
 * }
 * @behavior
 * - Formats `value` using toFixed(1) for display.
 * - If `value` is undefined, the numeric area is rendered empty.
 * - Renders an `Icon` at size 50 next to the label.
 * - Label text serves as the accessible name for the metric.
 * - Non-interactive element; not focusable by default.
 * @edgecases
 * - value === NaN => displays "NaN" (from Number.toFixed).
 * - Very large numbers may trigger toFixed RangeError.
 * - Missing `iconName` may render no icon or an Icon fallback.
 * - Null/undefined `label` or `unit` renders empty text.
 * @performance
 * - Wrap with React.memo to avoid re-renders when props are unchanged.
 * @tests
 * - Renders provided `label`, `unit`, and formatted `value`.
 * - Omits numeric text when `value` is undefined.
 * - Calls `Icon` with the given `iconName` and size 50.
 * - Accessibility: visible label is exposed to screen readers.
 * - Edge: pass NaN and large numbers to validate error/format handling.
 * @related
 * - `Icon` — icon rendering helper; `AirConditions` — aggregated list component.
 */
function AirConditionElement({
    label,
    value,
    unit,
    iconName,
}: {
    label: string;
    value?: number;
    unit: string;
    iconName: string;
}) {
    return (
        <div className="air-condition-item">
            <div className="air-condition-item-label-container">
                <Icon name={iconName} size={50} />
                <div className="air-condition-label">{label}</div>
            </div>
            <div className="air-condition-value">{value?.toFixed(1)} {unit}</div>
        </div>
    );
}

export default AirConditionElement;