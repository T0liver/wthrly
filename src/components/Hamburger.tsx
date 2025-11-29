import "../assets/hamburger.css";

interface HamburgerProps {
    onClick: () => void;
}

export default function Hamburger({ onClick }: HamburgerProps) {
    return (
        <div className="hamburger-menu" onClick={onClick}>
            <img src="/icons/icons8-hamburger.png" alt="Menu" />
        </div>
    );
}
