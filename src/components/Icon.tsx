import { getWeatherIcon } from "../utils/weatherIcon";

/**
 * @component — Renders a weather icon image for UI.
 * @props
 * - name: string (optional) — "sun" — fallback icon filename base.
 * - wIcon: string (optional) — undefined — weather code mapped to icon.
 * - size: number (optional) — undefined — width and height in pixels.
 * @example
 * import React from "react";
 * import Icon from "./Icon";
 *
 * export default function Example() {
 *   return <Icon wIcon="01d" size={48} />;
 * }
 * @behavior
 * - wIcon takes precedence over name when provided.
 * - Resolves icon name using getWeatherIcon(wIcon) mapping.
 * - Renders an <img> at /icons/icons8-{name}.png.
 * - Sets alt text, display:block, and opacity 0.9.
 * - No keyboard interaction; image is passive/decorative by default.
 * @edgecases
 * - Unknown wIcon mapping may produce a missing image (404).
 * - size <= 0 yields width/height attributes of zero.
 * - Non-string name or wIcon may produce invalid src.
 * - Providing both name and wIcon: wIcon overrides name.
 * @performance — Tiny presentational component; memoize if re-rendered often.
 * @tests
 * - Unit: verifies src when wIcon maps to expected name.
 * - Unit: verifies name used when wIcon is undefined.
 * - Unit: verifies width/height reflect size prop.
 * - A11y: image has non-empty alt attribute.
 * - A11y: ensure decorative images use aria-hidden when appropriate.
 * @related — See `../utils/weatherIcon` mapping and `Icon` consumers.
 */
function Icon({
	name,
	wIcon,
	size,
}: {
	name?: string;
	wIcon?: string;
	size?: number;
}) {
	const wGIcon = getWeatherIcon(wIcon);
	name = wIcon ? wGIcon : name ? name : "sun";
	return (
		<img
			src={`icons/icons8-${name}.png`}
			alt="icon"
			width={size}
			height={size}
			style={{ display: "block", opacity: 0.9 }}
		/>
	);
}

export default Icon;
