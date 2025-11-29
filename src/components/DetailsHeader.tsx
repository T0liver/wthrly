import "../assets/main.css";

function DetailsHeader({ title }: { title: string }) {
    return <div className="details-header">
            {title}
        </div>;
}

export default DetailsHeader;