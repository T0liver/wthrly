import "../assets/loading.css";

/**
 * @component Fullscreen loading overlay with a centered spinner.
 *
 * @props
 *   none: void (optional) — undefined — No props accepted.
 *
 * @example
 * import React from "react";
 * import { createRoot } from "react-dom/client";
 * import Loading from "./Loading";
 *
 * function App() {
 *   const [loading, setLoading] = React.useState(true);
 *   React.useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);
 *   return loading ? <Loading /> : <div>App content</div>;
 * }
 *
 * createRoot(document.getElementById("root")!).render(<App />);
 *
 * @behavior
 * - Renders a full-viewport overlay that blocks pointer interactions.
 * - Displays a visually centered spinner element.
 * - Does not manage application focus; caller should manage focus on mount.
 * - Recommend adding role="status" and aria-live="polite" for screen readers.
 *
 * @edgecases
 * - Missing CSS: spinner element may be invisible or unstyled.
 * - Multiple overlays: stacking order may hide underlying overlays.
 * - SSR: CSS animations not visible until client hydration.
 * - Large pages: overlay covers entire document regardless of scroll.
 *
 * @performance
 * - Minimal render cost; memoize if toggled very frequently.
 *
 * @tests
 * - Unit: renders overlay and spinner DOM nodes.
 * - Unit: verifies overlay has expected className "loading-overlay".
 * - A11y: assert role="status" and aria-live present or recommended.
 * - Integration: toggling show/hide does not throw and unmounts cleanly.
 *
 * @related
 * - `src/assets/loading.css` — spinner styles and overlay layout.
 */
export default function Loading(): JSX.Element {
  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-label="Loading">
      <div className="spinner" />
    </div>
  );
}
