import "../assets/footer.css";
import FooterElement from "./FooterElement";

/**
 * @component Renders the application's attribution and external links.
 *
 * @example
 * import React from "react";
 * import Footer from "./components/Footer";
 *
 * export default function App(): JSX.Element {
 *   return (
 *     <div>
 *       <main>App content</main>
 *       <Footer />
 *     </div>
 *   );
 * }
 *
 * @behavior
 * - Renders static attribution lines and external anchor elements.
 * - Links open in new tabs with target="_blank" and rel attributes.
 * - No keyboard handlers; relies on native link keyboard behavior.
 * - No network requests or async side effects.
 *
 * @edgecases
 * - Passing unsanitized HTML into FooterElement may cause XSS.
 * - Missing `FooterElement` import will cause render-time error.
 * - Long strings may overflow layout without CSS constraints.
 *
 * @performance
 * - Small static component; wrap export in React.memo for frequent re-renders.
 *
 * @tests
 * - Unit: renders all attribution text and expected anchor hrefs.
 * - Unit: asserts links have target="_blank" and rel="noopener noreferrer".
 * - Accessibility: links have accessible names and keyboard focusable.
 * - Integration: snapshot of footer markup and className presence.
 *
 * @related
 * - `FooterElement` — renders individual footer lines and HTML content.
 */
function Footer() {
    return <div className="footer-container">
        <FooterElement text='T0liver © 2025' />
        <FooterElement text='Icons by <a href="http://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>.' />
        <FooterElement text='Getting weather data from<br/><a href="https://api.met.no/" target="_blank" rel="noopener noreferrer">The Norwegian Meteorological Institute</a>.' />
        <FooterElement text="Getting geo location from <a href='https://nominatim.openstreetmap.org/' target='_blank' rel='noopener noreferrer'>OpenStreetMap's Nominatim</a>." />
        <FooterElement text='The Celsius radian idea is from Jávor Márton.' />
    </div>;
}

export default Footer;