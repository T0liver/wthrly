import "../assets/sidecard.css";

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