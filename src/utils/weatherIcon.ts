const iconMap: { [key: string]: string } = {
    // Clear / fair
    "clearsky": "sun",
    "clearsky_day": "sun",
    "clearsky_night": "night",
    "fair": "partly-cloudy-day",
    "fair_day": "partly-cloudy-day",
    "fair_night": "clouds",

    // Cloud coverage
    "partlycloudy": "partly-cloudy-day",
    "partlycloudy_day": "partly-cloudy-day",
    "partlycloudy_night": "clouds",
    "cloudy": "clouds",
    "cloud": "cloud",

    // Fog / haze
    "fog": "fog",
    "haze": "haze",

    // Rain
    "lightrain": "light-rain",
    "lightrainandthunder": "cloud-lightning",
    "lightrainshowers": "light-rain",
    "lightrainshowersandthunder": "cloud-lightning",

    "rain": "rain",
    "rainandthunder": "stormy-weather",
    "rainshowers": "rain-cloud",
    "rainshowersandthunder": "cloud-lightning",
    "heavyrain": "heavy-rain",
    "heavyrainandthunder": "storm-with-heavy-rain",
    "heavyrainshowers": "storm-with-heavy-rain",
    "heavyrainshowersandthunder": "storm-with-heavy-rain",

    // Sleet / mixed
    "lightsleet": "sleet",
    "lightsleetandthunder": "sleet",
    "lightsleetshowers": "sleet",
    "lightssleetshowersandthunder": "sleet",
    "sleet": "sleet",
    "sleetandthunder": "sleet",
    "sleetshowers": "sleet",
    "sleetshowersandthunder": "sleet",
    "heavysleet": "sleet",
    "heavysleetandthunder": "sleet",
    "heavysleetshowers": "sleet",
    "heavysleetshowersandthunder": "sleet",

    // Snow
    "lightsnow": "light-snow",
    "lightsnowandthunder": "light-snow",
    "lightsnowshowers": "light-snow",
    "lightssnowshowersandthunder": "light-snow",
    "snow": "snow-storm",
    "snowandthunder": "snow-storm",
    "snowshowers": "snow-storm",
    "snowshowersandthunder": "snow-storm",
    "heavysnow": "snow-storm",
    "heavysnowandthunder": "snow-storm",
    "heavysnowshowers": "snow-storm",
    "heavysnowshowersandthunder": "snow-storm",

    // Wind / other
    "wind": "wind",
    "tornado": "tornado",
    "icy": "icy",
};

export const getWeatherIcon = (iconCode: string) => {
    return iconMap[iconCode] || "sun";
};
