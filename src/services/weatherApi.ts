const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export async function getCityCoordinates(cityName: string) {
    const response = await fetch(`${GEOCODING_API}?name=${cityName}&count=1`);
    const data = await response.json();
    return data.results?.[0]; // returns { latitude, longitude, name, country }
}

export async function getWeather(latitude: number, longitude: number) {
    const response = await fetch(
        `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    );
    return response.json();
}

export async function searchCities(query: string) {
    const response = await fetch(
        `${GEOCODING_API}?name=${query}&count=5&language=en&format=json`
    );
    const data = await response.json();
    return data.results || [];
}
