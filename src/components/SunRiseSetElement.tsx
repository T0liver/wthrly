import "../assets/sunriseset.css";
import Icon from "./Icon";

function SunRiseSetElement({ type, time }: { type: 'rise' | 'set', time: string }) {
    const localTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return <div className="sun-rise-set-item">
        <Icon name={`sun${type}`} size={50} />
        <div className="sun-rise-set-label">{localTime}</div>
    </div>;
}

export default SunRiseSetElement;