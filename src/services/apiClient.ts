import ky from 'ky';

const apiClient = ky.create({
  prefixUrl: 'https://api.openweathermap.org/data/2.5',
  searchParams: {
    appid: import.meta.env.VITE_APP_API_KEY,
  },
});

export default apiClient;
