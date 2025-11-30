const iconMap: { [key: string]: string } = {
    // Clear / fair
    "clearsky": "sun",
    "clearsky_day": "sun",
    "clearsky_night": "night",
    "fair": "partly-cloudy-day",
    "fair_day": "partly-cloudy-day",
    "fair_night": "clouds",

    // Cloud coverage
    "partlycloudy": "partly-cloudy-day",
    "partlycloudy_day": "partly-cloudy-day",
    "partlycloudy_night": "clouds",
    "cloudy": "clouds",
    "cloud": "cloud",

    // Fog / haze
    "fog": "fog",
    "haze": "haze",

    // Rain
    "lightrain": "light-rain",
    "lightrainandthunder": "cloud-lightning",
    "lightrainshowers": "light-rain",
    "lightrainshowersandthunder": "cloud-lightning",

    "rain": "rain",
    "rainandthunder": "stormy-weather",
    "rainshowers": "rain-cloud",
    "rainshowersandthunder": "cloud-lightning",
    "heavyrain": "heavy-rain",
    "heavyrainandthunder": "storm-with-heavy-rain",
    "heavyrainshowers": "storm-with-heavy-rain",
    "heavyrainshowersandthunder": "storm-with-heavy-rain",

    // Sleet / mixed
    "lightsleet": "sleet",
    "lightsleetandthunder": "sleet",
    "lightsleetshowers": "sleet",
    "lightssleetshowersandthunder": "sleet",
    "sleet": "sleet",
    "sleetandthunder": "sleet",
    "sleetshowers": "sleet",
    "sleetshowersandthunder": "sleet",
    "heavysleet": "sleet",
    "heavysleetandthunder": "sleet",
    "heavysleetshowers": "sleet",
    "heavysleetshowersandthunder": "sleet",

    // Snow
    "lightsnow": "light-snow",
    "lightsnowandthunder": "light-snow",
    "lightsnowshowers": "light-snow",
    "lightssnowshowersandthunder": "light-snow",
    "snow": "snow-storm",
    "snowandthunder": "snow-storm",
    "snowshowers": "snow-storm",
    "snowshowersandthunder": "snow-storm",
    "heavysnow": "snow-storm",
    "heavysnowandthunder": "snow-storm",
    "heavysnowshowers": "snow-storm",
    "heavysnowshowersandthunder": "snow-storm",

    // Wind / other
    "wind": "wind",
    "tornado": "tornado",
    "icy": "icy",
};
/**
 * @component Return a normalized icon key for a weather condition code.
 * @props
 * iconCode: string (required) — "" — Weather code from API, should be lowercase.
 * @example
 * import React from 'react';
 * import { getWeatherIcon } from './utils/weatherIcon';
 *
 * const WeatherIconExample: React.FC<{ code: string }> = ({ code }) => {
 *   const iconKey = getWeatherIcon(code);
 *   return <span role="img" aria-label={iconKey}>{iconKey}</span>;
 * };
 *
 * export default function App() {
 *   return <WeatherIconExample code="lightrain" />;
 * }
 * @behavior
 * - Maps known API codes to local icon keys synchronously.
 * - Returns fallback "sun" when code is not recognized.
 * - Pure function: no I/O or side effects.
 * - Safe for SSR and client render paths.
 * @edgecases
 * - null or undefined -> treated as unknown, returns "sun".
 * - Non-string inputs -> coerced or mismatched, returns fallback.
 * - Uppercase or spaced codes -> mapping may fail, returns fallback.
 * @performance
 * - Constant-time O(1) lookup; no memoization required.
 * @tests
 * - unit: known code returns expected icon key.
 * - unit: unknown code returns "sun".
 * - unit: null/undefined returns "sun".
 * - a11y: rendered element includes role and aria-label.
 * @related Icon component, weatherService
 */
export const getWeatherIcon = (iconCode: string) => {
    return iconMap[iconCode] || "sun";
};
