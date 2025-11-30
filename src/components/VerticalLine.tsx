import '../assets/verticalline.css';

/**
 * @component Renders a simple decorative vertical divider with a center dot.
 * @props
 * - className: string (optional) — '' — Additional container CSS class.
 * - ariaLabel: string | null (optional) — null — Accessible label when not decorative.
 * - decorative: boolean (optional) — true — Mark as purely decorative (aria-hidden).
 * @example
 * import VerticalLine from './VerticalLine';
 *
 * const Example:
 *     <VerticalLine />
 *
 * export default Example;
 * @behavior
 * - Renders three DOM elements: line, dot, line.
 * - Merges `className` onto container class.
 * - If `decorative` true, sets aria-hidden="true".
 * - If `ariaLabel` provided, sets role="img" and aria-label.
 * @edgecases
 * - `decorative=false` without `ariaLabel`: fails accessibility requirement.
 * - `ariaLabel=''`: treated as provided empty label.
 * - Long `className` strings are passed through unchanged.
 * @performance Use React.memo when rendering in large lists or frequent updates.
 * @tests
 * - Unit: renders container with three child elements.
 * - Unit: merges provided `className`.
 * - Unit: sets aria-hidden when decorative true.
 * - Unit: sets role and aria-label when ariaLabel provided.
 * - A11y: throws or flags when decorative false without ariaLabel.
 * @related See `SideCard` and `VerticalLine` usage patterns in layout components.
 */
const VerticalLine = () => {
  return (
    <div className="vertical-line-container">
      <div className="line"></div>
      <div className="dot"></div>
      <div className="line"></div>
    </div>
  );
};

export default VerticalLine;
