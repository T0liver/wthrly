import "../assets/card.css";
import Icon from "./Icon";
import { CSSProperties } from "preact";
import CelsiusRadian from "./CelsiusRadian";
import Celsius from "./Celsius";

/**
 * @component Props for the `Card` component.
 * @props
 * - day: string (optional) — undefined — Day label above the temperature.
 * - tempC: number (required) — — Temperature value in Celsius.
 * - icon: string (optional) — "cloud" — Icon name for weather glyph.
 * - className: string (optional) — undefined — Additional CSS class names.
 * - style: CSSProperties (optional) — undefined — Inline style object.
 * @example
 * import React from "react";
 * import Card from "./Card";
 *
 * export default function Example() {
 *   return <Card day="Wed" tempC={12.5} icon="rain" />;
 * }
 * @behavior
 * - Describes shape consumed by the `Card` component.
 * - Enforced by the TypeScript compiler at build time.
 * @edgecases
 * - Omitting `tempC` causes a compile-time type error.
 * - Non-number `tempC` yields type or formatting issues.
 * - Passing very large values may affect layout.
 * @performance
 * - Keep props shallow and stable for efficient memoization.
 * @tests
 * - Type-check presence of required `tempC` prop.
 * - Render component with and without optional props.
 * @related
 * - `Card` — component implementing these props.
 */
interface CardProps {
	day?: string;
	tempC: number;
	icon?: string;
	className?: string;
    style?: CSSProperties;
}

/**
 * @component Present a compact forecast card with day, temperature, and icon.
 * @props
 * - day: string (optional) — undefined — Day label above the temperature.
 * - tempC: number (required) — — Temperature value in Celsius.
 * - icon: string (optional) — "cloud" — Icon name for weather glyph.
 * - className: string (optional) — undefined — Additional CSS class names.
 * - style: CSSProperties (optional) — undefined — Inline style object.
 * @example
 * import React from "react";
 * import Card from "./Card";
 *
 * export default function Example() {
 *   return (
 *     <div>
 *       <Card day="Mon" tempC={18.3} icon="sun" />
 *     </div>
 *   );
 * }
 * @behavior
 * - Renders `day`, `Celsius`, and `CelsiusRadian` visuals.
 * - Shows `Icon` with aria-hidden inside the card.
 * - Uses `className` and `style` for layout customization.
 * - Non-interactive container; not focusable by default.
 * @edgecases
 * - Missing `tempC` will cause TypeScript error at compile time.
 * - Non-finite numbers produce `NaN` or unexpected formatting.
 * - Extremely large values may overflow layout styles.
 * - Null/empty `day` renders an empty day cell.
 * @performance
 * - Keep pure and wrap with React.memo to avoid unnecessary renders.
 * @tests
 * - Renders provided `day` and formatted temperature.
 * - Uses default `icon` when none provided.
 * - Applies `className` and `style` props correctly.
 * - Accessibility: icon is aria-hidden; day visible to screen readers.
 * - Edge: pass NaN and extremely large numbers.
 * @related
 * - `Celsius` / `CelsiusRadian` — temperature display helpers.
 */
export default function Card({
	day,
	tempC,
	icon = "cloud",
	className,
    style
}: CardProps) {
	return (
		<div className={`card ${className || ""}`} style={style}>
			<div className="day">{day}</div>
			<Celsius tempC={tempC} size="26pt" weight={400} fractionDigits={1} />
			<CelsiusRadian tempC={tempC}  />
			<div className="spacer" />
			<div aria-hidden><Icon name={icon} /></div>
            <div className="spacer" />
		</div>
	);
}
