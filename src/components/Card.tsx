import type { WeatherData } from '../utils/weather';

export default function Card({
    day,
    date,
    emoji,
    description,
    temperatureMin,
    temperatureMax,
    currentTemperature
}: WeatherData) {
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">{day}</h2>
                <p className="text-s text-gray-500">{date}</p>
                <div className="text-6xl mb-2">{emoji}</div>
                <div className="text-3xl w-full h-20 flex items-center justify-center text-center overflow-y-auto wrap-break-word whitespace-pre-wrap px-2">
                    {description}
                </div>
                 {currentTemperature !== undefined && currentTemperature !== null && <p className="text-3xl font-bold">Now: {currentTemperature}°C</p>}
                <p className="text-2xl font-bold">{temperatureMin}°C</p>
                <p className="text-2xl font-bold">{temperatureMax}°C</p>
            </div>
        </div>
    );
}
