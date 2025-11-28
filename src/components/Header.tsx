import "../assets/header.css";

function Header({ text = "Wthrly" }: { text?: string }) {
    return (
        <header className="app-header">
            <h1 className="app-title">{text}</h1>
        </header>
    );
}

export default Header;