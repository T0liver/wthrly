import "../assets/footer.css";
import FooterElement from "./FooterElement";

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