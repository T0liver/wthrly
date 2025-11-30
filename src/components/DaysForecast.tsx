import "../assets/daysforecast.css";
import { useWeather } from "../context/WeatherContext";
import { getDayName } from "../utils/dayName";
import { getWeatherIcon } from "../utils/weatherIcon";
import Card from "./Card";

/**
 * @component Renders a compact multi-day forecast as Card components.
 *
 * @props
 * - none
 *
 * @example
 * import React from "react";
 * import DaysForecast from "./components/DaysForecast";
 * import { WeatherProvider } from "./context/WeatherContext";
 *
 * export default function App() {
 *   return (
 *     <WeatherProvider>
 *       <DaysForecast />
 *     </WeatherProvider>
 *   );
 * }
 *
 * @behavior
 * - Reads `forecastData` from `useWeather` context.
 * - Maps each forecast day to a `Card` with day, temp, icon.
 * - Renders nothing when `forecastData` is undefined or empty.
 * - No interactive keyboard behavior; purely presentational.
 * - Relies on `getDayName` and `getWeatherIcon` for display.
 *
 * @edgecases
 * - `forecastData` undefined => renders empty container.
 * - Items missing `dt`/`temp`/`icon` => may render incorrect values.
 * - Non-array `forecastData` => runtime error if not guarded upstream.
 * - Large arrays => increased render cost, consider virtualization.
 *
 * @performance
 * - Keep parent providers stable and memoize `DaysForecast` if needed.
 *
 * @tests
 * - Unit: renders one Card per forecast item.
 * - Unit: returns empty DOM when `forecastData` is falsy.
 * - Accessibility: each card has descriptive text or aria-label.
 * - Edge: handles item missing fields without throwing.
 *
 * @migration
 * - No breaking changes for current API (context-based).
 *
 * @related
 * - Card — visual day item
 * - useWeather — provides `forecastData`
 * - getDayName, getWeatherIcon — formatters
 */

function DaysForecast() {
    const { forecastData } = useWeather();

    return (
        <div className="days-forecast">
            {forecastData?.map(day => (
                <Card
                    key={day.dt}
                    day={getDayName(new Date(day.dt * 1000))}
                    tempC={day.temp}
                    icon={getWeatherIcon(day.icon)}
                />
            ))}
        </div>
    );
}

export default DaysForecast;