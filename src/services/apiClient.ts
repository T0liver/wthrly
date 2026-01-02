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
const weatherBaseUrl = import.meta.env.DEV ? '/weatherapi' : 'https://api.met.no/weatherapi';

const apiClient = ky.create({
  prefixUrl: `${weatherBaseUrl}/locationforecast/2.0`,
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
  prefixUrl: `${weatherBaseUrl}/sunrise/3.0/sun`,
});

/**
 * @component HTTP client configured for OpenStreetMap Nominatim Geocoding API.
 * @props
 * prefixUrl: string (required) — base API URL. Uses a local dev proxy when running in DEV mode (`/nominatim`) and
 * `https://nominatim.openstreetmap.org` in production.
 * headers: Record<string,string> (optional) — no default headers are set here because requests may be proxied in
 * development; if you call the public Nominatim service directly please include a proper `User-Agent` or `email` per
 * Nominatim usage policy.
 * @example
 * import { geocodingApiClient } from './services/apiClient';
 * // geocodingApiClient.get('search?format=json&q=Oslo')
 *
 * @behavior
 * - Reuses a single ky instance for connection pooling.
 * - Expects callers to include the appropriate query parameters (e.g. `q`, `format=json`, `limit`).
 * - Returns whatever the endpoint returns (typically JSON for `format=json` requests); callers should parse JSON.
 *
 * @edgecases
 * - Rate limiting / courtesy: the public Nominatim service is rate-limited and requires a proper `User-Agent` or
 * `email` identifying the application; failing to provide one or sending too many requests may result in HTTP 429.
 * - Missing query params: API returns 4xx; validate inputs before requesting.
 * - Proxying in DEV: when `import.meta.env.DEV` is true the client points to `/nominatim` — ensure the dev proxy is
 * configured to forward requests to the real Nominatim server.
 * - Network errors: ky throws; callers should catch and retry/backoff as needed.
 *
 * @performance Reuse the exported instance across the app; do not recreate per render.
 *
 * @tests
 * - Unit: mock ky to assert `prefixUrl` is set to the expected base depending on env.
 * - Unit: simulate 4xx/5xx responses to assert caller error handling and retry logic.
 * - Integration: hit the proxied endpoint in a test environment to ensure DEV proxying works.
 *
 * @related Uses: components that perform forward/reverse geocoding (e.g. `Location.tsx`) — callers should adapt query
 * parameters and parse the returned shape.
 */
const baseUrl = import.meta.env.DEV ? '/nominatim' : 'https://nominatim.openstreetmap.org';

const geocodingApiClient = ky.create({
  prefixUrl: baseUrl,
  headers: {
    'User-Agent': 'wtrly/1.0 https://github.com/T0liver/wtrly',
  },
});

export { apiClient, sunriseApiClient, geocodingApiClient };
