/**
 * @component Render a rotated arrow icon representing wind direction.
 *
 * @props
 * direction: number (required) — none — Wind direction in degrees clockwise.
 * size: number (optional) — 30 — Icon width/height in pixels.
 *
 * @example
 * import React from "react";
 * import WindDirectionIcon from "./WindDirectionIcon";
 *
 * export default function Example() {
 *   return <WindDirectionIcon direction={135} size={40} />;
 * }
 *
 * @behavior
 * - Renders an <img> element rotated via CSS transform.
 * - Uses `size` for both width and height attributes.
 * - Provides alt text for screen-reader context.
 * - No keyboard interaction by default; decorative if aria-hidden.
 *
 * @edgecases
 * - Non-numeric `direction` results in `NaN` rotation (invalid CSS).
 * - Missing `/icons/icons8-arrow.png` yields a broken image.
 * - `size <= 0` yields zero or collapsed image dimensions.
 *
 * @performance
 * - Low render cost; wrap with React.memo to avoid parent re-renders.
 *
 * @tests
 * - Unit: style.transform equals `rotate(${direction}deg)` for given prop.
 * - Unit: width/height attributes reflect `size` prop value.
 * - A11y: image includes descriptive alt text.
 * - Edge: pass non-number `direction` and assert graceful failure or validation.
 *
 * @related
 * - See `WinDirection` component for directional label display.
 */
function WindDirectionIcon({ direction, size = 30 }: { direction: number, size?: number }) {
    return (
		<img
			src={`icons/icons8-arrow.png`}
			alt="wind direction icon"
			width={size}
			height={size}
			style={{ display: "block", transform: `rotate(${direction}deg)` }}
		/>
	);
}

export default WindDirectionIcon;
