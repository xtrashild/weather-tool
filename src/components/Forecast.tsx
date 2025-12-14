import { useEffect, useState } from 'react';
import { getCityCoordinates, getWeather } from '../services/weatherApi';
import type { WeatherData } from '../utils/weather';
import { getWeatherInfo } from '../utils/weatherCode';
import Card from './Card';

interface ForecastProps {
    city: string;
}

export default function Forecast({ city }: ForecastProps) {
    const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);

    useEffect(() => {
        async function fetchWeather() {
            if (!city) return;
            const location = await getCityCoordinates(city);
            const weather = await getWeather(
                location.latitude,
                location.longitude
            );
            const currentTemperature = weather.current_weather?.temperature;
            const temperaturesMin = weather.daily?.temperature_2m_min;
            const temperaturesMax = weather.daily?.temperature_2m_max;
            const dates = weather.daily?.time;
            const weatherCodes = weather.daily?.weathercode;
            const weatherDataArray: WeatherData[] = [];

            for (let i = 0; i < 7; i++) {
                const dateObj = new Date(dates[i]);
                const dayName = dateObj.toLocaleDateString('en-US', {
                    weekday: 'long'
                });
                const formattedDate = dateObj.toLocaleDateString('en-GB'); // dd/mm/yyyy format

                const weatherInfo = getWeatherInfo(weatherCodes[i]);
                weatherDataArray.push({
                    day: dayName,
                    date: formattedDate,
                    currentTemperature:
                        i === 0 ? Math.round(currentTemperature) : undefined,
                    temperatureMin: Math.round(temperaturesMin[i]),
                    temperatureMax: Math.round(temperaturesMax[i]),
                    emoji: weatherInfo.emoji,
                    description: weatherInfo.description
                });
            }
            setWeatherData(weatherDataArray);
        }

        fetchWeather();
    }, [city]);

    return (
        <>
            <div className="container mx-auto p-4">
                {weatherData && weatherData.length > 0 && (
                    <>
                        <div className="mb-4">
                            <Card
                                day={weatherData[0].day}
                                date={weatherData[0].date}
                                emoji={weatherData[0].emoji}
                                description={weatherData[0].description}
                                temperatureMin={weatherData[0].temperatureMin}
                                temperatureMax={weatherData[0].temperatureMax}
                                currentTemperature={
                                    weatherData[0].currentTemperature
                                }
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start">
                            {weatherData.slice(1, 7).map((data, index) => (
                                <div key={index} className="col-span-1">
                                    <Card
                                        day={data.day}
                                        date={data.date}
                                        emoji={data.emoji}
                                        description={data.description}
                                        temperatureMin={data.temperatureMin}
                                        temperatureMax={data.temperatureMax}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
