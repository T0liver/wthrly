const iconMap: { [key: string]: string } = {
    "01d": "sun",
    "01n": "night",
    "02d": "partly-cloudy-day",
    "02n": "clouds",
    "03d": "cloud",
    "03n": "cloud",
    "04d": "clouds",
    "04n": "clouds",
    "09d": "heavy-rain",
    "09n": "heavy-rain",
    "10d": "light-rain",
    "10n": "light-rain",
    "11d": "stormy-weather",
    "11n": "stormy-weather",
    "13d": "light-snow",
    "13n": "light-snow",
    "50d": "haze",
    "50n": "haze",
};

export const getWeatherIcon = (iconCode: string) => {
    return iconMap[iconCode] || "sun";
};
