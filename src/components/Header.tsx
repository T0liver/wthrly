import "../assets/header.css";
import Icon from "./Icon";

function Header({ text = "Wthrly" }: { text?: string }) {
    return (
        <header className="app-header">
            <h1 className="app-title">{text}</h1>
            < Icon name="clouds-and-sun" size={150} />
        </header>
    );
}

export default Header;