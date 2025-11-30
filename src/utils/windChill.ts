import { celciusToFahrenheit, mpsToMph } from "./numbers";

/**
 * Calculates the wind chill factor based on the Steadman formula.
 * This formula is used by the National Weather Service in the US.
 * Source: https://www.weather.gov/media/epz/wxcalc/windChill.pdf
 *
 * @param {number} temperature - Air temperature in Celsius.
 * @param {number} windSpeed - Wind speed in meters per second (m/s).
 * @returns {number} Rounded wind chill value (see behavior for units).
 *
 * @example
 * // Minimal usage inside a React component
 * import React from 'react';
 * import { calculateWindChill } from './utils/windChill';
 *
 * const Example: React.FC = () => {
 *   const tempC = 2; // °C
 *   const windMps = 6; // m/s
 *   const windChill = calculateWindChill(tempC, windMps);
 *   return <div>Wind chill: {windChill}°F</div>;
 * };
 *
 * @behavior
 * - Implements the Steadman (NWS) wind-chill formula.
 * - Converts Celsius→Fahrenheit and m/s→mph internally.
 * - Returns a rounded numeric wind-chill value.
 * - Pure function with no side effects.
 *
 * @edgecases
 * - windSpeed < 4.8 m/s: returns rounded input temperature (no chill).
 * - NaN/undefined inputs: produces NaN (no internal validation).
 * - Negative windSpeed: treated the same as any numeric value.
 * - Very large values: may overflow JS number precision (rare).
 * - Note: implementation returns wind-chill in Fahrenheit (see behavior).
 *
 * @performance
 * - O(1) numeric math; use memoization (useMemo) if called on every render.
 *
 * @tests
 * - Unit: temp=0°C, wind=10 m/s → expected approximate wind-chill value.
 * - Unit: temp=5°C, wind=2 m/s → returns 5 (rounded input temp).
 * - Unit: NaN inputs → result is NaN.
 * - Accessibility: N/A (pure util).
 *
 * @related
 * - Uses helpers: `celciusToFahrenheit`, `mpsToMph` from `./numbers`.
 */
export const calculateWindChill = (temperature: number, windSpeed: number): number => {
  if (windSpeed < 4.8) {
    return Math.round(temperature);
  }

  /**
   * Because america is a dumb country we have to convert everything
   * (americans would use *anything* but SI units)
   * https://www.reddit.com/r/Metric/comments/cpbi2g/americans_will_measure_with_anything_but_the/
   */
  const windSpeedMph = mpsToMph (windSpeed);
  const tempF = celciusToFahrenheit(temperature);
  const windSfcPowwed = Math.pow(windSpeedMph, 0.16)
   const windChill =
    35.74 +
    (0.6215 * tempF) -
    (35.75 * windSfcPowwed) +
    (0.4275 * tempF * windSfcPowwed);

  return Math.round(windChill);
};
