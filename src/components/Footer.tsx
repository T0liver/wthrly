import "../assets/footer.css";

function Footer() {
    return <div className="footer-container">
        <div className="footer-text">T0liver © 2025</div>
        <div className="footer-text">Icons by <a href="http://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</a>.</div>
        <div className="footer-text">Getting weather data from<br/><a href="https://api.met.no/" target="_blank" rel="noopener noreferrer">The Norwegian Meteorological Institute</a>.</div>
        <div className="footer-text">Getting geo location from <a href="https://nominatim.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OpenStreetMap's Nominatim</a>.</div>
        <div className="footer-text">The Celsius radian idea is from Jávor Márton.</div>
    </div>;
}

export default Footer;