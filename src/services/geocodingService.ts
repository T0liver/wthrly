import ky from 'ky';

const geocodingApiClient = ky.create({
  prefixUrl: 'https://nominatim.openstreetmap.org',
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

export interface GeocodingData {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

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
