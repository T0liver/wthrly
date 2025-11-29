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

export interface UIData {
  name: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  clouds_all: number;
  weather_icon: string;
  weather_description: string;
  sunrise: string;
  sunset: string;
}

export interface ForecastData {
  dt: number;
  temp: number;
  icon: string;
}

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
