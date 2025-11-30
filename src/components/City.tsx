import "../assets/city.css";

/**
 * @component Render a clickable city list element for selection.
 *
 * @props
 * name: string (required) — - — Displayed city name.
 * onClick: (name: string) => void (required) — - — Called when city is activated.
 *
 * @example
 * <City name="Paris" onClick={(n) => console.log(n)} />
 *
 * @behavior
 * - Calls onClick with the supplied name when clicked.
 * - Renders the city name inside a simple container element.
 * - No built-in role/keyboard handlers; not focusable by default.
 * - Consumers should add role="button" and tabIndex for a11y.
 *
 * @edgecases
 * - name === '' or null: renders empty text.
 * - onClick is undefined: will cause a runtime error.
 * - onClick throws: exception bubbles to parent.
 * - Rapid repeated clicks: no internal throttling/debounce.
 *
 * @performance
 * - Small, cheap render; memoize parent lists to reduce re-renders.
 *
 * @tests
 * - Unit: renders provided name text.
 * - Unit: invokes onClick with correct name on click.
 * - Accessibility: verifies focusable when role/button + tabIndex set.
 * - Edge: handles empty string name without crashing.
 *
 * @related
 * - `Favourite`, `Location`, `useFavourites`
 */
function City({ name, onClick }: { name: string; onClick: (name: string) => void }) {
    return (
        <div className="city-list-element" onClick={() => onClick(name)}>
            <p>{name}</p>
        </div>
    );
}

export default City;