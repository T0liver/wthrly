import "../assets/sidecard.css"

/**
 * @component Small static callout linking to the repository issue tracker.
 * @props
 * none: — (optional) — — No configurable props.
 * @example
 * import React from "react";
 * import SideCard from "./SideCard";
 *
 * export default function Example() {
 *   return (
 *     <div style={{ maxWidth: 320 }}>
 *       <SideCard />
 *     </div>
 *   );
 * }
 * @behavior
 * - Renders static informational text and a single external anchor link.
 * - Anchor uses target="_blank" and rel="noopener noreferrer".
 * - Anchor is keyboard focusable and exposed to screen readers.
 * @edgecases
 * - Missing network/access to GitHub results in non-functional link.
 * - Extremely long container widths may affect layout (CSS controlled).
 * - No props means consumers cannot override content or href.
 * @performance
 * Stateless and inexpensive to render; memoize only if re-render hotspots exist.
 * @tests
 * - Unit: renders two informational paragraphs and one anchor.
 * - Unit: anchor has correct href, target and rel attributes.
 * - A11y: anchor is keyboard focusable and has discernible text.
 * - Snapshot: stable markup across renders.
 * @migration
 * - None; no previous public API to break.
 * @related
 * - See SideBar, Footer for related layout components.
 */
function SideCard() {
    return (
        <div className="side-card">
            <p>Did you find a bug?</p>
            <p>Write me a github issue!</p>
            <a
                href="https://github.com/T0liver/wthrly/issues"
                target="_blank"
                rel="noopener noreferrer"
            >
                github.com/T0liver/wthrly/issues
            </a>
        </div>
    );
}

export default SideCard;