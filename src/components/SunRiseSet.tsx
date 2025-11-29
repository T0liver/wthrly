import "../assets/sunriseset.css";
import SunRiseSetElement from "./SunRiseSetElement";

function SunRiseSet() {
    return <div className="sun-rise-set-container">
        <div className="sun-rise-set-header">Sn Rs & St</div>
        <SunRiseSetElement type="rise" time="06:12" />
        <SunRiseSetElement type="set" time="19:45" />
    </div>;
}

export default SunRiseSet;