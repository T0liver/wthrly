/// <reference types="vite/client" />
import ky from 'ky';

/**
 * @component HTTP client configured for MET Norway Locationforecast API.
 * @props
 * prefixUrl: string (required) — 'https://api.met.no/weatherapi/locationforecast/2.0' — base API URL.
 * headers: Record<string,string> (optional) — {'User-Agent':...} — default request headers.
 * @example
 * import { apiClient } from './services/apiClient';
 * // apiClient.get('compact?lat=59.91&lon=10.75')
 * @behavior
 * - Reuses a single ky instance for efficient connection pooling.
 * - Sends required User-Agent header with every request.
 * - Does not transform response bodies; callers parse JSON/text.
 * @edgecases
 * - Network errors: ky throws; callers should catch and retry.
 * - Non-2xx responses: ky throws HTTPError by default.
 * - Missing query params: API returns 4xx; validate before request.
 * @performance Reuse the exported instance; do not recreate per render.
 * @tests
 * - Unit: mock ky to assert prefixUrl and headers set.
 * - Unit: simulate 4xx/5xx to assert caller error handling.
 * - Accessibility: n/a (non-UI module).
 * @related Uses: ./weatherService.ts — higher-level API wrappers.
 */
const apiClient = ky.create({
  prefixUrl: 'https://api.met.no/weatherapi/locationforecast/2.0',
  headers: {
    'User-Agent': 'wtrly/1.0 https://github.com/T0liver/wtrly',
  },
});

/**
 * @component HTTP client configured for MET Norway Sunrise/Sunset API.
 * @props
 * prefixUrl: string (required) — 'https://api.met.no/weatherapi/sunrise/3.0/sun' — base API URL.
 * headers: Record<string,string> (optional) — {'User-Agent':...} — default request headers.
 * @example
 * import { sunriseApiClient } from './services/apiClient';
 * // sunriseApiClient.get('?lat=59.91&lon=10.75&date=2025-11-30')
 * @behavior
 * - Reuses a single ky instance for sunrise calculations.
 * - Requires date or date range query parameters.
 * - Returns XML or JSON depending on endpoint; callers parse accordingly.
 * @edgecases
 * - Missing date param: API returns error; validate inputs.
 * - Timezone mismatches: caller must interpret returned times.
 * - Network/errors: ky throws; implement retries/timeouts externally.
 * @performance Reuse the exported instance across the app.
 * @tests
 * - Unit: mock ky responses for a known date/coords.
 * - Unit: assert required query validation in callers.
 * - Accessibility: n/a (non-UI module).
 * @related Uses: ./SunRiseSet.tsx — UI component consuming sunrise data.
 */
const sunriseApiClient = ky.create({
  prefixUrl: 'https://api.met.no/weatherapi/sunrise/3.0/sun',
  headers: {
    'User-Agent': 'wtrly/1.0 https://github.com/T0liver/wtrly',
  },
});

const baseUrl = import.meta.env.DEV ? '/nominatim' : 'https://nominatim.openstreetmap.org';

const geocodingApiClient = ky.create({
  prefixUrl: baseUrl,
});

export { apiClient, sunriseApiClient, geocodingApiClient };
