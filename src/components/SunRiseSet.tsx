import "../assets/sunriseset.css";
import DetailsHeader from "./DetailsHeader";
import SunRiseSetElement from "./SunRiseSetElement";

function SunRiseSet({ sunrise, sunset }: { sunrise: string, sunset: string }) {
    return <div className="sun-rise-set-container">
        <DetailsHeader title="Sn Rs & St" />
        <SunRiseSetElement type="rise" time={sunrise} />
        <SunRiseSetElement type="set" time={sunset} />
    </div>;
}

export default SunRiseSet;