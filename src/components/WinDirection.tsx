import "../assets/airconditions.css";
import WindDirectionIcon from "./WindDirectionIcon";

function WindDirection({ direction }: { direction: number }) {
    return (
        <div className="air-condition-item">
            <div className="air-condition-item-label-container">
                <WindDirectionIcon direction={direction} />
                <div className="air-condition-label">Wnd Dir</div>
            </div>
            <div className="air-condition-value">{direction}˚</div>
        </div>
    );
}

export default WindDirection;