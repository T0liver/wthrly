import "../assets/sidebar.css";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>
            <div className="sidebar-content">
            </div>
        </div>
    );
}
