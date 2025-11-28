import Icon from "./Icon";
import "../assets/airconditions.css";

function AirConditions({ realFeel, wind, clouds, humidity }: { realFeel?: number, wind?: number, clouds?: number, humidity?: number }) {
    return <div className="air-conditions-container">
        <div className="air-condition-header">Air Conditions</div>
        <div className="air-condition-item">
            <div className="air-condition-item-label-container">
                <Icon name="thermometer" size={50} />
                <div className="air-condition-label">Rl Fl</div>
            </div>
            <div className="air-condition-value">{realFeel} ˚C</div>
        </div>
        <div className="air-condition-item">
            <div className="air-condition-item-label-container">
                <Icon name="wind" size={50} />
                <div className="air-condition-label">Wnd</div>
            </div>
            <div className="air-condition-value">{wind} m/s</div>
        </div>
        <div className="air-condition-item">
            <div className="air-condition-item-label-container">
                <Icon name="cloud" size={50} />
                <div className="air-condition-label">Clds</div>
            </div>
            <div className="air-condition-value">{clouds} %</div>
        </div>
        <div className="air-condition-item">
            <div className="air-condition-item-label-container">
                <Icon name="wet" size={50} />
                <div className="air-condition-label">Hmdty</div>
            </div>
            <div className="air-condition-value">{humidity} %</div>
        </div>
    </div>;
}

export default AirConditions;