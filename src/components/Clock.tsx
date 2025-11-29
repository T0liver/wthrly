import "../assets/clock.css";

import { useEffect, useState } from "react";

function Clock() {
    const [time, setTime] = useState<string>(getCurrentTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getCurrentTimeString());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="clock">
            {time}
        </div>
    );
}

export default Clock;

function getCurrentTimeString(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}