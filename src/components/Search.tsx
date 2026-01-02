import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
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
    const [inputValue, setInputValue] = useState('London');
    const [cities, setCities] = useState<City[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const isSelectingFromDropdown = useRef(false);

    useEffect(() => {
        const debouncedSearch = debounce(async () => {
            if (isSelectingFromDropdown.current) {
                isSelectingFromDropdown.current = false;
                return;
            }

            if (inputValue.length >= 3) {
                const results = await searchCities(inputValue);
                setCities(results);
                setShowDropdown(true);

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
        isSelectingFromDropdown.current = true;
        setInputValue(cityName);
        setShowDropdown(false);
        onSearch(cityName);
    };

    return (
        <div className="w-full pt-6 flex justify-center">
    <div className="w-full max-w-lg px-4 mb-8">
        <div className="dropdown w-full">
            <label className="input input-bordered flex items-center gap-2 w-full">
                <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <input
                    type="text"
                    placeholder="Search a city"
                    className="grow"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {inputValue && (
                    <svg
                        className="h-[1em] opacity-50 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        onClick={() => setInputValue('')}
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                )}
            </label>
            {showDropdown && cities.length > 0 && (
                <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-full p-2 shadow mt-1">
                    {cities.map((city, index) => (
                        <li
                            key={index}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleCitySelect(`${city.name}, ${city.country}`);
                            }}
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
