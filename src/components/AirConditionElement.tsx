import "../assets/airconditions.css";
import Icon from "./Icon";

function AirConditionElement({ label, value, unit, iconName }: { label: string; value?: number; unit: string; iconName: string }) {
    return (
        <div className="air-condition-item">
            <div className="air-condition-item-label-container">
                <Icon name={iconName} size={50} />
                <div className="air-condition-label">{label}</div>
            </div>
            <div className="air-condition-value">{value} {unit}</div>
        </div>
    );
}

export default AirConditionElement;