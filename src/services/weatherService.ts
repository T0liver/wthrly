import apiClient from './apiClient';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  return apiClient
    .get('weather', {
      searchParams: {
        q: city,
        units: 'metric',
      },
    })
    .json<WeatherData>();
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
  const currentWeatherData = await getCurrentWeather(city);
  return {
    name: currentWeatherData.name,
    temp: currentWeatherData.main.temp,
    feels_like: currentWeatherData.main.feels_like,
    humidity: currentWeatherData.main.humidity,
    wind_speed: currentWeatherData.wind.speed,
    clouds_all: currentWeatherData.clouds.all,
    weather_icon: currentWeatherData.weather[0].icon,
    weather_description: currentWeatherData.weather[0].description,
  };
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  return apiClient
    .get('forecast', {
      searchParams: {
        q: city,
        units: 'metric',
      },
    })
    .json<ForecastData>();
};
