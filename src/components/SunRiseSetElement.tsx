import "../assets/sunriseset.css";
import Icon from "./Icon";

function SunRiseSetElement({ type, time }: { type: 'rise' | 'set', time: string }) {
    return <div className="sun-rise-set-item">
        <Icon name={`sun${type}`} size={50} />
        <div className="sun-rise-set-label">{time}</div>
    </div>;
}

export default SunRiseSetElement;