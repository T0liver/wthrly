import "../assets/clock.css";

import { useEffect, useState } from "react";

/**
 * @component Display current local time, updating every minute.
 *
 * @example
 * import React from "react";
 * import Clock from "./Clock";
 *
 * export default function App() {
 *   return (
 *     <div>
 *       <Clock />
 *     </div>
 *   );
 * }
 *
 * @behavior
 * - Updates displayed time once per minute using setInterval.
 * - Clears interval on unmount to avoid memory leaks.
 * - Renders time in HH:MM 24-hour format.
 * - Recommended a11y: add role="timer" and aria-live="polite".
 *
 * @edgecases
 * - Browser timer throttling in background may delay updates.
 * - System clock changes reflect immediately on next tick.
 * - Environments without Date support may throw errors.
 * - Rapid mount/unmount repeatedly creates/clears timers.
 *
 * @performance Render once per minute; wrap in React.memo if needed.
 *
 * @tests
 * - Unit: initial render shows HH:MM pattern.
 * - Unit: advancing timers updates rendered minutes.
 * - Unit: unmount clears interval (no active timers).
 * - A11y: has role="timer" or aria-live present.
 *
 * @migration
 * - none: No breaking changes; current API has no props.
 *
 * @related Related: `SunRiseSet` component, `useEffect` hook.
 */

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

function getCurrentTimeString(): string {
    const t = new Date();
    const h = t.getHours().toString().padStart(2, '0');
    const m = t.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
}

export default Clock;