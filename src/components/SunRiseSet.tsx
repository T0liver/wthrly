import "../assets/sunriseset.css";
import SunRiseSetElement from "./SunRiseSetElement";

function SunRiseSet({ sunrise, sunset }: { sunrise: string, sunset: string }) {
    return <div className="sun-rise-set-container">
        <div className="sun-rise-set-header">Sn Rs & St</div>
        <SunRiseSetElement type="rise" time={sunrise} />
        <SunRiseSetElement type="set" time={sunset} />
    </div>;
}

export default SunRiseSet;