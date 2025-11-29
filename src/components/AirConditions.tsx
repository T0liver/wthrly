import "../assets/airconditions.css";
import AirConditionElement from "./AirConditionElement";

function AirConditions({ realFeel, wind, clouds, humidity }: { realFeel?: number, wind?: number, clouds?: number, humidity?: number }) {
    return <div className="air-conditions-container">
        <div className="air-condition-header">Ar Cndtns</div>
        <AirConditionElement label="Rl Fl" value={realFeel} unit="˚C" iconName="thermometer" />
        <AirConditionElement label="Wnd" value={wind} unit="m/s" iconName="wind" />
        <AirConditionElement label="Clds" value={clouds} unit="%" iconName="cloud" />
        <AirConditionElement label="Hmdty" value={humidity} unit="%" iconName="wet" />
    </div>;
}

export default AirConditions;