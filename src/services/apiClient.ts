import ky from 'ky';

const apiClient = ky.create({
  prefixUrl: 'https://api.met.no/weatherapi/locationforecast/2.0',
  headers: {
    'User-Agent': 'wtrly/1.0 https://github.com/T0liver/wtrly',
  },
});

const sunriseApiClient = ky.create({
  prefixUrl: 'https://api.met.no/weatherapi/sunrise/3.0/sun',
  headers: {
    'User-Agent': 'wtrly/1.0 https://github.com/T0liver/wtrly',
  },
});

export { apiClient, sunriseApiClient };
