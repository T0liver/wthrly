import "../assets/footer.css";

/**
 * @component Renders footer HTML content inside a styled container.
 * @props
 * text: string (required) — — HTML string rendered into the container.
 * @example
 * ```tsx
 * import React from 'react';
 * import FooterElement from './FooterElement';
 *
 * export default function Example() {
 *   const html = '<span>© 2025 <strong>Acme</strong></span>';
 *   return <FooterElement text={html} />;
 * }
 * ```
 * @behavior
 * - Renders provided HTML via dangerouslySetInnerHTML.
 * - Does not sanitize input; consumer must sanitize if needed.
 * - Non-interactive by default; focusable elements rely on markup.
 * @edgecases
 * - null/undefined text: will throw TypeError if not string.
 * - Large HTML strings: may impact render performance.
 * - Unsanitized input: risk of XSS if untrusted HTML provided.
 * @performance Memoize parent or wrap with React.memo when static.
 * @tests
 * - unit: renders plain text and nested markup correctly.
 * - unit: throws or warns on missing text prop (type check).
 * - a11y: ensure no interactive elements lack accessible names.
 * @related Footer — page footer wrapper component.
 */
function FooterElement({ text }: { text: string }) {
    return <div className="footer-text" dangerouslySetInnerHTML={{ __html: text }} />;
}

export default FooterElement;