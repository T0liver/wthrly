import "../assets/city.css";

interface CityProps {
    name: string;
    onClick: (name: string) => void;
}

function City({ name, onClick }: CityProps) {
    return (
        <div className="city-list-element" onClick={() => onClick(name)}>
            <p>{name}</p>
        </div>
    );
}

export default City;