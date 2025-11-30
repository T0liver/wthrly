import { apiClient, sunriseApiClient } from './apiClient';
import { getCoordinates } from './geocodingService';
import { calculateWindChill } from '../utils/windChill';

interface MetAPIData {
  properties: {
    timeseries: {
      time: string;
      data: {
        instant: {
          details: {
            air_temperature: number;
            relative_humidity: number;
            wind_speed: number;
            cloud_area_fraction: number;
            wind_from_direction: number;
          };
        };
        next_1_hours?: {
          summary: {
            symbol_code: string;
          };
        };
      };
    }[];
  };
}

interface SunriseAPIData {
  properties: {
    sunrise: {
      time: string;
    };
    sunset: {
      time: string;
    };
  };
}

/**
 * @component UIData — shape of UI-ready current weather data.
 * @props
 * name: string (required) — - — City or location name.
 * temp: number (required) — - — Current temperature (°C).
 * feels_like: number (required) — - — Apparent temperature (wind chill).
 * humidity: number (required) — - — Relative humidity percentage.
 * wind_speed: number (required) — - — Wind speed in m/s.
 * wind_from_direction: number (required) — - — Wind direction degrees.
 * clouds_all: number (required) — - — Cloud cover percentage.
 * weather_icon: string (required) — - — Icon code for weather symbol.
 * weather_description: string (required) — - — Human-readable weather text.
 * sunrise: string (required) — - — ISO 8601 sunrise time string.
 * sunset: string (required) — - — ISO 8601 sunset time string.
 * @example
 * // usage: type annotation example
 * const sample: UIData = {
 *   name: 'Oslo',
 *   temp: 3.2,
 *   feels_like: 0.5,
 *   humidity: 80,
 *   wind_speed: 5,
 *   wind_from_direction: 180,
 *   clouds_all: 40,
 *   weather_icon: 'clearsky_day',
 *   weather_description: 'clearsky day',
 *   sunrise: '2025-11-30T08:15:00Z',
 *   sunset: '2025-11-30T15:20:00Z'
 * };
 * @behavior
 * - Normalized for direct UI consumption.
 * - Times are ISO strings; no localization applied.
 * - No DOM side effects; pure data shape.
 * @edgecases
 * - Missing fields will break UI render expectations.
 * - Non-ISO time strings are unsupported.
 * - Numeric fields may be NaN if API returns invalid values.
 * @performance
 * Prefer shallow equality or memoization for prop stability.
 * @tests
 * - Assert all fields present after service call.
 * - Render consumer component with sample UIData.
 * - Accessibility: verify readable sunrise/sunset labels.
 * @related
 * - getWeatherDataAndForecast (service)
 */
export interface UIData {
  name: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  wind_from_direction: number;
  clouds_all: number;
  weather_icon: string;
  weather_description: string;
  sunrise: string;
  sunset: string;
}

/**
 * @component ForecastData — daily forecast item shape.
 * @props
 * dt: number (required) — - — Unix timestamp in seconds.
 * temp: number (required) — - — Average daily temperature (°C).
 * icon: string (required) — - — Weather icon code.
 * @example
 * // usage: type annotation example
 * const f: ForecastData = { dt: 1700000000, temp: 4.1, icon: 'partlycloudy_day' };
 * @behavior
 * - dt is seconds-since-epoch (not milliseconds).
 * - icon may fallback to 'clearsky_day' if missing.
 * @edgecases
 * - Millisecond timestamps will misrepresent the date.
 * - Empty icon string treated as missing.
 * @performance
 * Keep ForecastData arrays referentially stable across renders.
 * @tests
 * - Validate dt numeric type and seconds unit.
 * - Ensure icon fallback behavior is enforced.
 */
export interface ForecastData {
  dt: number;
  temp: number;
  icon: string;
}

/**
 * @component getWeatherDataAndForecast — fetch current weather and a 5-day forecast.
 * @props
 * city: string (required) — - — City name used for geocoding lookup.
 * @example
 * import React, { useEffect } from 'react';
 * import { getWeatherDataAndForecast } from './services/weatherService';
 *
 * export default function Example() {
 *   useEffect(() => {
 *     (async () => {
 *       const { current, forecast } = await getWeatherDataAndForecast('Oslo');
 *       console.log(current, forecast);
 *     })();
 *   }, []);
 *   return null;
 * }
 * @behavior
 * - Resolves geocoding, then calls weather and sunrise APIs.
 * - Converts API payloads into UIData and ForecastData arrays.
 * - Throws on network or geocoding failures.
 * @edgecases
 * - Throws if geocoding returns no coordinates.
 * - May return NaN for temps if API data incomplete.
 * - Timezone offsets are preserved as ISO timestamps only.
 * @performance
 * Cache or memoize results per city to reduce network load.
 * @tests
 * - Mock apiClient and sunriseApiClient to assert output shapes.
 * - Unit test error propagation on network failure.
 * - Integration test: verify forecast length and averaging.
 * @related
 * - ./geocodingService.getCoordinates
 */
export const getWeatherDataAndForecast = async (
  city: string
): Promise<{ current: UIData; forecast: ForecastData[] }> => {
  const coords = await getCoordinates(city);

  const weatherData = await apiClient
    .get('compact', {
      searchParams: {
        lat: coords.lat,
        lon: coords.lon,
      },
    })
    .json<MetAPIData>();

  const sunriseData = await sunriseApiClient
    .get(
      `?lat=${coords.lat}&lon=${coords.lon}`
    )
    .json<SunriseAPIData>();

  const currentData = weatherData.properties.timeseries[0].data;
  const weather_icon =
    currentData.next_1_hours?.summary.symbol_code ?? 'clearsky_day';

  const temp = currentData.instant.details.air_temperature;
  const wind_speed = currentData.instant.details.wind_speed;

  const current: UIData = {
    name: coords.name,
    temp,
    feels_like: calculateWindChill(temp, wind_speed),
    humidity: currentData.instant.details.relative_humidity,
    wind_speed: currentData.instant.details.wind_speed,
    wind_from_direction: currentData.instant.details.wind_from_direction,
    clouds_all: currentData.instant.details.cloud_area_fraction,
    weather_icon,
    weather_description: weather_icon.replace(/_/g, ' '),
    sunrise: sunriseData.properties.sunrise.time,
    sunset: sunriseData.properties.sunset.time,
  };

  const dailyForecasts = new Map<
    string,
    { temps: number[]; icons: string[] }
  >();

  weatherData.properties.timeseries.forEach(item => {
    const date = new Date(item.time);
    const today = new Date();
    if (date.getDate() === today.getDate()) return;

    const dateStr = item.time.split('T')[0];
    if (!dailyForecasts.has(dateStr)) {
      dailyForecasts.set(dateStr, { temps: [], icons: [] });
    }
    dailyForecasts
      .get(dateStr)!
      .temps.push(item.data.instant.details.air_temperature);
    if (item.data.next_1_hours) {
      dailyForecasts
        .get(dateStr)!
        .icons.push(item.data.next_1_hours.summary.symbol_code);
    }
  });

  const forecast = Array.from(dailyForecasts.entries())
    .slice(0, 5)
    .map(([date, data]) => {
      const avgTemp =
        data.temps.reduce((a, b) => a + b, 0) / data.temps.length;
      const mostCommonIcon = data.icons
        .sort(
          (a, b) =>
            data.icons.filter(v => v === a).length -
            data.icons.filter(v => v === b).length
        )
        .pop();

      return {
        dt: new Date(date).getTime() / 1000,
        temp: avgTemp,
        icon: mostCommonIcon ?? 'clearsky_day',
      };
    });

  return { current, forecast };
};
