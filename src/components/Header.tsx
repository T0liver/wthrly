import "../assets/header.css";
import Icon from "./Icon";

/**
 * @component Top app header displaying a title and decorative icon.
 * @props
 * text: string (optional) — "Wthrly" — header title text.
 * @example
 * import Header from './Header';
 * <Header text="San Francisco" />
 * @behavior
 * - Renders an <h1> with `.app-title` and an `Icon` component.
 * - Uses CSS classes `.app-header` and `.app-title` for layout.
 * - Icon is decorative; treat it as aria-hidden if non-informative.
 * @edgecases
 * - text non-string => TypeScript compile-time type error.
 * - empty string => renders empty heading; no automatic fallback.
 * - very long text => may overflow; rely on CSS for truncation/wrap.
 * - missing `Icon` export => runtime render error.
 * @performance Small render cost; memoize if parent re-renders frequently.
 * @tests
 * - Unit: renders provided `text` value.
 * - Unit: renders default "Wthrly" when `text` omitted.
 * - A11y: heading exposed to assistive tech (accessible name).
 * - Integration: Icon receives `size` prop and renders SVG.
 * @related Icon — decorative SVG icon component used alongside header.
 */
function Header({ text = "Wthrly" }: { text?: string }) {
    return (
        <header className="app-header">
            <h1 className="app-title">{text}</h1>
            < Icon name="clouds-and-sun" size={150} />
        </header>
    );
}

export default Header;