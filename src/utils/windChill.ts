import { celciusToFahrenheit, mpsToMph } from "./numbers";

/**
 * Calculates the wind chill factor based on the Steadman formula.
 * This formula is used by the National Weather Service in the US.
 * Source: https://www.weather.gov/media/epz/wxcalc/windChill.pdf
 * @param temperature Air temperature in Celsius.
 * @param windSpeed Wind speed in meters/second.
 * @returns The calculated wind chill temperature in Celsius.
 */
export const calculateWindChill = (temperature: number, windSpeed: number): number => {
  if (windSpeed < 4.8) {
    return temperature - 1;
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
