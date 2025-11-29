import "../assets/airconditions.css";
import AirConditionElement from "./AirConditionElement";
import DetailsHeader from "./DetailsHeader";
import WindDirection from "./WinDirection";

function AirConditions({ realFeel, wind, clouds, humidity, direction }: { realFeel?: number, wind?: number, clouds?: number, humidity?: number, direction?: number }) {
    return <div className="air-conditions-container">
        <DetailsHeader title="Ar Cndtns" />
        <AirConditionElement label="Rl Fl" value={realFeel} unit="˚C" iconName="thermometer" />
        <AirConditionElement label="Wnd" value={wind} unit="m/s" iconName="wind" />
        <AirConditionElement label="Clds" value={clouds} unit="%" iconName="cloud" />
        <AirConditionElement label="Hmdty" value={humidity} unit="%" iconName="wet" />
        <WindDirection direction={direction} />
    </div>;
}

export default AirConditions;