import "../assets/sunriseset.css";
import Icon from "./Icon";

/**
 * @component Renders a decorative sun icon and localized sunrise/sunset time.
 *
 * @props
 * - type: 'rise' | 'set' (required) — - — Icon variant: 'rise' or 'set'.
 * - time: string (required) — - — ISO or parsable time string.
 *
 * @example
 * import React from 'react';
 * import SunRiseSetElement from './SunRiseSetElement';
 *
 * export default function Example() {
 *   return <SunRiseSetElement type="rise" time="2025-11-30T07:12:00Z" />;
 * }
 *
 * @behavior
 * - Formats `time` to locale hour:minute using user's locale.
 * - Renders `<Icon>` and a text label with localized time.
 * - Icon is decorative; visible text supplies accessible label.
 * - No keyboard interactions; no side effects.
 *
 * @edgecases
 * - Invalid `time` string -> Date shows "Invalid Date".
 * - Empty `time` -> Date parsing yields invalid result.
 * - Unknown `type` (runtime) -> Icon receives raw name prop.
 *
 * @performance
 * - Small, pure render; memoize with React.memo if re-render heavy.
 *
 * @tests
 * - unit: renders correct localized time for ISO timestamp.
 * - unit: shows sunrise icon for `type="rise"`.
 * - unit: shows sunset icon for `type="set"`.
 * - unit: does not throw on invalid `time`.
 * - a11y: label text is readable by screen readers.
 *
 * @related
 * - `./Icon` — decorative icon component used for visuals.
 */

function SunRiseSetElement({ type, time }: { type: 'rise' | 'set', time: string }) {
    const localTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return <div className="sun-rise-set-item">
        <Icon name={`sun${type}`} size={50} />
        <div className="sun-rise-set-label">{localTime}</div>
    </div>;
}

export default SunRiseSetElement;