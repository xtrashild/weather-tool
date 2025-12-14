import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { searchCities } from '../services/weatherApi';

interface City {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
}

interface SearchProps {
    onSearch: (city: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
    const [inputValue, setInputValue] = useState('');
    const [cities, setCities] = useState<City[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const debouncedSearch = debounce(async () => {
            if (inputValue.length >= 3) {
                const results = await searchCities(inputValue);
                setCities(results);
                setShowDropdown(true);

                // Trigger weather search with first result
                if (results.length > 0) {
                    onSearch(results[0].name);
                }
            } else {
                setShowDropdown(false);
            }
        }, 500);

        debouncedSearch();

        return () => {
            debouncedSearch.cancel();
        };
    }, [inputValue, onSearch]);

    const handleCitySelect = (cityName: string) => {
        setInputValue(cityName);
        setShowDropdown(false);
        onSearch(cityName);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="form-control w-full max-w-md mx-auto mb-8">
                <label className="label">
                    <span className="label-text">City</span>
                </label>
                <div className="dropdown w-full">
                    <input
                        type="text"
                        placeholder="Enter city name..."
                        className="input input-bordered w-full"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    {showDropdown && cities.length > 0 && (
                        <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-full p-2 shadow">
                            {cities.map((city, index) => (
                                <li
                                    key={index}
                                    onMouseDown={(e) => {e.preventDefault; handleCitySelect(`${city.name}, ${city.country}`)}}
                                    className="cursor-pointer"
                                >
                                    <a>
                                        {city.name}, {city.country}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
