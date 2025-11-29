import apiClient from './apiClient';
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

export interface UIData {
  name: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  clouds_all: number;
  weather_icon: string;
  weather_description: string;
}

export const getWeatherData = async (city: string): Promise<UIData> => {
  const coords = await getCoordinates(city);

  const weatherData = await apiClient
    .get('compact', {
      searchParams: {
        lat: coords.lat,
        lon: coords.lon,
      },
    })
    .json<MetAPIData>();

  const currentData = weatherData.properties.timeseries[0].data;
  const weather_icon =
    currentData.next_1_hours?.summary.symbol_code ?? 'clearsky_day';

  const temp = currentData.instant.details.air_temperature;
  const wind_speed = currentData.instant.details.wind_speed;

  return {
    name: coords.name,
    temp,
    feels_like: calculateWindChill(temp, wind_speed),
    humidity: currentData.instant.details.relative_humidity,
    wind_speed: currentData.instant.details.wind_speed,
    clouds_all: currentData.instant.details.cloud_area_fraction,
    weather_icon,
    weather_description: weather_icon.replace(/_/g, ' '),
  };
};

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      icon: string;
    }[];
  }[];
}

export const getForecast = async (city: string): Promise<ForecastData> => {
  const coords = await getCoordinates(city);

  const forecastData = await apiClient
    .get('compact', {
      searchParams: {
        lat: coords.lat,
        lon: coords.lon,
      },
    })
    .json<MetAPIData>();

  const dailyForecasts = new Map<
    string,
    { temps: number[]; icons: string[] }
  >();

  forecastData.properties.timeseries.forEach(item => {
    const date = item.time.split('T')[0];
    if (!dailyForecasts.has(date)) {
      dailyForecasts.set(date, { temps: [], icons: [] });
    }
    dailyForecasts
      .get(date)!
      .temps.push(item.data.instant.details.air_temperature);
    if (item.data.next_1_hours) {
      dailyForecasts
        .get(date)!
        .icons.push(item.data.next_1_hours.summary.symbol_code);
    }
  });

  const list = Array.from(dailyForecasts.entries()).map(([date, data]) => {
    const avgTemp = data.temps.reduce((a, b) => a + b, 0) / data.temps.length;
    const mostCommonIcon = data.icons
      .sort(
        (a, b) =>
          data.icons.filter(v => v === a).length -
          data.icons.filter(v => v === b).length
      )
      .pop();

    return {
      dt: new Date(date).getTime() / 1000,
      main: {
        temp: avgTemp,
      },
      weather: [
        {
          icon: mostCommonIcon ?? 'clearsky_day',
        },
      ],
    };
  });

  return { list };
};
