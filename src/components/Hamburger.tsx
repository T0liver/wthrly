import "../assets/hamburger.css";

interface HamburgerProps {
    onClick: () => void;
}

/**
 * @component — Compact hamburger/menu button used to toggle navigation.
 * @props
 * - onClick: () => void (required) — N/A — Click handler toggling the menu.
 * @example
 * import React, { useState } from "react";
 * import Hamburger from "./Hamburger";
 *
 * export default function Example() {
 *   const [open, setOpen] = useState(false);
 *   return <Hamburger onClick={() => setOpen(v => !v)} />;
 * }
 * @behavior
 * - Invokes onClick when the container is clicked.
 * - Renders an <img> with alt="Menu" for screen readers.
 * - No internal state; presentational only.
 * - Not keyboard-focusable by default (add tabIndex/role externally).
 * @edgecases
 * - Missing onClick: TypeScript will flag a compile error.
 * - onClick throwing synchronously will propagate to caller.
 * - Broken image src results in browser broken-image UI.
 * - Rapid clicks call onClick multiple times in quick succession.
 * @performance
 * - Pure presentational; wrap with React.memo to avoid unnecessary re-renders.
 * @tests
 * - Unit: renders image with correct alt text.
 * - Unit: calls onClick when clicked.
 * - Accessibility: verifies role/tabIndex when provided externally.
 * - Unit: snapshot of rendered markup.
 * - Edge: simulate broken image src fallback rendering.
 * @related
 * - Related: `Header`, `SideBar`, `Icon` components.
 */
export default function Hamburger({ onClick }: HamburgerProps) {
    return (
        <div className="hamburger-menu" onClick={onClick}>
            <img src="/icons/icons8-hamburger.png" alt="Menu" />
        </div>
    );
}
