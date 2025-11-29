import "../assets/city.css";

function City({name}: {name: string}) {
    return (
        <div className="city-list-element">
            <p>{name}</p>
        </div>
    );
}

export default City;