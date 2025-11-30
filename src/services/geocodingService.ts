/// <reference types="vite/client" />
import ky from 'ky';

const baseUrl = import.meta.env.DEV ? '/nominatim' : 'https://nominatim.openstreetmap.org';

const geocodingApiClient = ky.create({
  prefixUrl: baseUrl,
});

interface NominatimFeature {
  properties: {
    display_name: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

interface NominatimResponse {
  features: NominatimFeature[];
}

/**
 * @component GeocodingData — structured location result from Nominatim.
 * @props
 * name: string (required) — — Place name (short)
 * lat: number (required) — — Latitude in decimal degrees
 * lon: number (required) — — Longitude in decimal degrees
 * country: string (required) — — Country name
 * @example
 * const data: GeocodingData = { name: 'London', lat: 51.5074, lon: -0.1278, country: 'United Kingdom' };
 * @behavior
 * - Plain data object returned by geocoding calls.
 * - Stable shape suitable for display and lookups.
 * @edgecases
 * - Missing geometry when API returns unexpected payload.
 * - Non-string display_name may yield truncated name.
 * @performance
 * Small fixed object; cheap to clone and compare.
 * @tests
 * - Should contain name, lat, lon, country for valid response.
 * - Fields must be correct types (string/number).
 * @related
 * - services/weatherService — used to fetch weather for coordinates.
 */
export interface GeocodingData {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

/**
 * @component getCoordinates — fetch coordinates for a city query.
 * @props
 * city: string (required) — — City or place query string
 * @example
 * import { getCoordinates } from './services/geocodingService';
 *
 * (async () => {
 *   const loc = await getCoordinates('London');
 *   console.log(loc.name, loc.lat, loc.lon);
 * })();
 * @behavior
 * - Calls Nominatim search endpoint with geojson format.
 * - Limits results to 1 and returns the first feature.
 * - Throws Error('City not found') when no results.
 * - Uses local '/nominatim' proxy in development.
 * @edgecases
 * - Empty or whitespace query may return zero features.
 * - API rate limits or network errors propagate as exceptions.
 * - Unexpected geometry shape may cause runtime errors.
 * @performance
 * Network-bound; callers should debounce rapid calls.
 * @tests
 * - Resolves coordinates for known city input.
 * - Rejects with 'City not found' for unknown input.
 * - Preserves numeric lat/lon types.
 * @related
 * - services/apiClient, services/weatherService
 */
export const getCoordinates = async (city: string): Promise<GeocodingData> => {
  const results = await geocodingApiClient
    .get('search', {
      searchParams: {
        q: city,
        format: 'geojson',
        limit: 1,
      },
    })
    .json<NominatimResponse>();

  if (results.features.length === 0) {
    throw new Error('City not found');
  }

  const feature = results.features[0];
  const displayNameParts = feature.properties.display_name.split(', ');

  return {
    name: displayNameParts[0],
    lon: feature.geometry.coordinates[0],
    lat: feature.geometry.coordinates[1],
    country: displayNameParts[displayNameParts.length - 1],
  };
};
