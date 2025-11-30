import "../assets/airconditions.css";
import WindDirectionIcon from "./WindDirectionIcon";

/**
 * @component Render wind direction with icon and degree value.
 * @props
 * - direction: number (required) — none — degrees clockwise from north.
 * @example
 * import React from "react";
 * import WindDirection from "./WinDirection";
 *
 * export default function Example() {
 *   return <WindDirection direction={135} />;
 * }
 * @behavior
 * - Renders an icon and a numeric degree value with "˚" suffix.
 * - Non-interactive, presentational; no keyboard handlers.
 * - Icon should be aria-hidden; label "Wnd Dir" exposed for screen readers.
 * @edgecases
 * - direction === undefined or NaN — displays "NaN˚"; validate upstream.
 * - Negative or >360 values — rendered raw; normalize before passing.
 * - Extremely large numbers — rendered raw; prefer modulo 360 upstream.
 * @performance
 * - Pure presentational; memoize parent or wrap with React.memo if needed.
 * @tests
 * - Unit: renders numeric value "120˚" when direction={120}.
 * - Unit: passes direction prop through to WindDirectionIcon.
 * - Accessibility: "Wnd Dir" label exists and is readable.
 * - Edge: undefined/NaN displays a degree suffix without crash.
 * - Snapshot: component structure remains stable.
 * @related
 * - WindDirectionIcon — icon renderer used by this component.
 */
function WindDirection({ direction }: { direction: number }) {
    return (
        <div className="air-condition-item">
            <div className="air-condition-item-label-container">
                <WindDirectionIcon direction={direction} />
                <div className="air-condition-label">Wnd Dir</div>
            </div>
            <div className="air-condition-value">{direction}˚</div>
        </div>
    );
}

export default WindDirection;