import "../assets/sunriseset.css";
import DetailsHeader from "./DetailsHeader";
import SunRiseSetElement from "./SunRiseSetElement";

/**
 * @component Render sunrise and sunset times with a header.
 *
 * @props
 * sunrise: string (required) — - — Time string for sunrise display.
 * sunset: string (required) — - — Time string for sunset display.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import SunRiseSet from './components/SunRiseSet';
 *
 * function Example() {
 *   return <SunRiseSet sunrise="06:12" sunset="18:45" />;
 * }
 *
 * export default Example;
 * ```
 *
 * @behavior
 * - Renders a header and two timed elements.
 * - No network or DOM side effects.
 * - Delegates accessible labeling to child elements.
 *
 * @edgecases
 * - Missing props -> child components may render empty values.
 * - Invalid time strings -> displayed verbatim by children.
 * - Extremely long strings -> layout overflow possible.
 *
 * @performance
 * - Pure presentational; wrap with React.memo to avoid re-renders.
 *
 * @tests
 * - Unit: renders header and two child elements.
 * - Unit: passes given time strings to children.
 * - Accessibility: header is visible and descriptive.
 * - Snapshot: stable markup for typical props.
 *
 * @related
 * - SunRiseSetElement — renders individual time entries.
 * - DetailsHeader — provides the section heading.
 */
function SunRiseSet({ sunrise, sunset }: { sunrise: string, sunset: string }) {
    return <div className="sun-rise-set-container">
        <DetailsHeader title="Sn Rs & St" />
        <SunRiseSetElement type="rise" time={sunrise} />
        <SunRiseSetElement type="set" time={sunset} />
    </div>;
}

export default SunRiseSet;