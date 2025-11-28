import "../assets/daysforecast.css";
import Card from "./Card";

function DaysForecast() {
    return (
        <div className="days-forecast">
            <Card day="Tmrrw" tempC={9.6}  />
            <Card day="Wndsdy" tempC={7.1} icon="rain"  />
            <Card day="Frdy" tempC={12.9} icon="sun"  />
            <Card day="Strdy" tempC={5.6} icon="snow-storm"  />
        </div>
    );
}

export default DaysForecast;