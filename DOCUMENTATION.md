# Wtrly — Project Documentation

Wtrly is a lightweight, fast weather application built with Preact and Vite. It fetches current weather, a concise multi‑day forecast, and sunrise/sunset times for a selected city, with a clean UI and responsive layout.

This document covers the project overview, architecture, data flow, setup, components, services, utilities, and contribution guidance.

## Overview

- Tech stack: Preact 10, TypeScript, Vite 7
- HTTP client: ky
- External APIs:
	- MET Norway Locationforecast (weather/forecast)
	- MET Norway Sunrise/Sunset API
	- OpenStreetMap Nominatim (geocoding via dev proxy)
- Key features:
	- City search and persistence (localStorage)
	- Current conditions with icons and descriptive text
	- 5-day forecast (daily averages + most common icon)
	- Sunrise/sunset times
	- Wind chill calculation
	- Sidebar navigation and favourites support hooks
	- Loading and transient error handling

## Architecture

### App entry

- File: `src/index.tsx`
- Renders `<App />` into `#app` DOM node and composes the main UI.
- `<App />` wraps the tree with `WeatherProvider` for global state.
- `<WeatherApp />` uses `useWeather()` to read state and render:
	- Header, Hamburger + SideBar
	- Location, Clock, Temperature
	- DaysForecast, AirConditions, SunRiseSet
	- VerticalLine, Footer
	- Error popup when `error` exists

### State management

- File: `src/context/WeatherContext.tsx`
- Provides global weather state and actions:
	- `weatherData: UIData | null` — current weather
	- `forecastData: ForecastData[] | null` — 5-day forecast
	- `isLoading: boolean` — loading indicator
	- `error: string | null` — transient error message
	- `fetchWeatherData(city: string)` — async fetcher
	- `setCity(city: string)` — updates city and triggers fetch
- On mount, reads `lastCity` from `localStorage` (default: "Bugyi") and fetches.
- Errors are surfaced and auto-cleared after 5 seconds.

### Networking and data services

- File: `src/services/apiClient.ts`
	- `apiClient` — ky instance for MET Locationforecast API: `https://api.met.no/weatherapi/locationforecast/2.0`
	- `sunriseApiClient` — ky instance for MET Sunrise API: `https://api.met.no/weatherapi/sunrise/3.0/sun`
	- Both include a required `User-Agent` header.

- File: `src/services/geocodingService.ts`
	- Dev uses proxy `/nominatim` (configured in `vite.config.ts`), prod uses `https://nominatim.openstreetmap.org`.
	- `getCoordinates(city)` fetches a single result (GeoJSON) and returns `{ name, lat, lon, country }`.
	- Throws `Error('City not found')` when no features.

- File: `src/services/weatherService.ts`
	- `getWeatherDataAndForecast(city)`:
		1. Geocodes the city to lat/lon.
		2. Fetches current weather/forecast (`compact`) and sunrise/sunset.
		3. Normalizes into UI-ready structures:
			 - `UIData` — current weather snapshot with icon and description.
			 - `ForecastData[]` — up to 5 daily items: avg temp and most common symbol.
		4. Returns `{ current, forecast }` and lets callers handle errors.

### Utilities

- File: `src/utils/numbers.ts`
	- `gradToRad(grad, fractionDigits=8)` — degrees to radians.
	- `celciusToFahrenheit(celsius, fractionDigits=3)` — °C→°F.
	- `fahrenheitToCelsius(fahrenheit, fractionDigits=3)` — °F→°C.
	- `celsiusToKelvin(celsius, fractionDigits=2)` — °C→K.
	- `celsiusToReaumur(celsius, fractionDigits=3)` — °C→°Ré.
	- `mpsToMph(mps, fractionDigits=3)` — m/s→mph.

- File: `src/utils/windChill.ts`
	- `calculateWindChill(temperatureC, windSpeedMps)` — computes wind chill using the NWS Steadman formula, converts units internally, and returns °C (rounded). For wind < 4.8 m/s, returns the input temperature rounded.

## UI Components

All components live under `src/components/`. The main ones used in the entry are:

- `Header` — top bar with app branding.
- `Hamburger` — opens the `SideBar`.
- `SideBar` — navigation and city/favourites interactions.
- `Location` — displays the current location name.
- `Clock` — shows current time.
- `Temperature` — current temperature, icon, description.
- `DaysForecast` — lists upcoming days with average temps and icons.
- `AirConditions` — real feel (wind chill), wind speed/direction, cloud cover, humidity.
- `SunRiseSet` — sunrise and sunset times.
- `VerticalLine` — layout divider.
- `Footer` — credits and links.
- `Loading` — skeleton/spinner shown while fetching.

Additionally, there are smaller building blocks (e.g., `AirConditionElement`, `SideCard`, `WindDirectionIcon`) and CSS assets under `src/assets/` to style the UI.

## Data contracts

### `UIData` (current weather)
```
{
	name: string,
	temp: number,
	feels_like: number,
	humidity: number,
	wind_speed: number,
	wind_from_direction: number, // degrees
	clouds_all: number,          // percent
	weather_icon: string,        // e.g., 'partlycloudy_day'
	weather_description: string, // icon code humanized
	sunrise: string,             // ISO timestamp
	sunset: string               // ISO timestamp
}
```

### `ForecastData` (daily)
```
{
	dt: number,  // seconds since epoch
	temp: number,
	icon: string
}
```

## Error handling and edge cases

- Geocoding may fail or return no results → `City not found` (caught by context, shown in UI).
- Network/HTTP errors from APIs propagate; context sets a user-friendly error and clears it after 5 seconds.
- `isLoading` ensures a smooth loading view until data is ready.
- Wind chill returns the input temp rounded when wind < 4.8 m/s.
- Forecast aggregation skips "today" and averages temps per remaining day; icon chosen by frequency.

## Development setup

Prerequisites:
- Node.js 18+

Install and run:

```bash
# install dependencies
npm install

# start dev server (with Nominatim proxy for geocoding)
npm run dev

# build for production
npm run build

# preview local production build
npm run preview
```

### Dev proxy

- Configured in `vite.config.ts`:
	- Proxy path: `/nominatim` → `https://nominatim.openstreetmap.org`
	- Adds `User-Agent` and `Referer` headers, rewrites path by removing `/nominatim` prefix.
- `geocodingService` automatically switches to proxy in dev and direct URL in production.

## How data flows

1. User selects or searches a city (via sidebar/components).
2. `WeatherContext.setCity(city)` triggers `fetchWeatherData(city)`.
3. `getCoordinates(city)` resolves `lat/lon`.
4. `apiClient.get('compact', { lat, lon })` + `sunriseApiClient.get(...lat,lon)` fetch raw data.
5. `weatherService` normalizes to `UIData` and `ForecastData[]`.
6. Context updates `weatherData`/`forecastData`, stores `lastCity`, and unsets loading.
7. UI renders `Temperature`, `DaysForecast`, `AirConditions`, `SunRiseSet`, etc.

## Testing ideas

- Mock `ky` to simulate API responses and failures.
- Context behavior:
	- Initial fetch uses `lastCity` or default.
	- Error state auto-clears; loading transitions correctly.
- Utility math:
	- Wind chill boundary (<4.8 m/s) returns rounded temp.
	- Unit conversions are accurate within rounding.
- Component rendering:
	- `Loading` visible while `isLoading`.
	- `Temperature` and `Location` reflect `UIData`.

## Accessibility and UX

- Ensure interactive elements (Hamburger/SideBar) are keyboard accessible.
- Provide `role="alert"` for transient error messages (as shown in index entry).
- Maintain sufficient color contrast in CSS assets.

## Deployment notes

- Static build via `vite build` outputs to `dist/`.
- No server is required, but external APIs must be reachable from the client.
- Consider rate limits and CORS policies of MET and OSM APIs.

## Contribution guidelines

- Use TypeScript for new code; keep public types stable.
- Prefer small, pure utilities and memoized components.
- Keep `User-Agent` headers up-to-date and descriptive.
- Add tests for services and context behavior when changing data shapes.
- Follow existing file organization: `components/`, `context/`, `services/`, `utils/`, `assets/`.

## Reference

- MET Locationforecast: https://api.met.no/weatherapi/locationforecast/2.0
- MET Sunrise: https://api.met.no/weatherapi/sunrise/3.0/sun
- OSM Nominatim: https://nominatim.openstreetmap.org

