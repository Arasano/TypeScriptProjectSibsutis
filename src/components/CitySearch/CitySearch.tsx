import React, { useState, useEffect } from 'react';
import { weatherApi } from '../../services/weatherApi';
import { CityInfo } from '../../types/Weather';
import './CitySearch.css';

interface CitySearchProps {
    onCitySelect: (city: CityInfo) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [cities, setCities] = useState<CityInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setLoading(true);
                try {
                    const results = await weatherApi.searchCities(query);
                    console.log('Search results:', results);
                    setCities(results);
                    setShowDropdown(true);
                } catch (error) {
                    console.error('Error searching cities:', error);
                    setCities([]);
                }
                setLoading(false);
            } else {
                setCities([]);
                setShowDropdown(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const handleCitySelect = (city: CityInfo) => {
        console.log('Selected city:', city);
        onCitySelect(city);
        setQuery('');
        setCities([]);
        setShowDropdown(false);
    };

    return (
        <div className="city-search" onClick={(e) => e.stopPropagation()}>
            <input
                type="text"
                placeholder="Search city..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => cities.length > 0 && setShowDropdown(true)}
                className="search-input"
            />

            {loading && (
                <div className="search-dropdown">
                    <div className="loading">Searching...</div>
                </div>
            )}

            {showDropdown && cities.length > 0 && (
                <div className="search-dropdown">
                    {cities.map((city, index) => (
                        <button
                            key={index}
                            onClick={() => handleCitySelect(city)}
                            className="city-item"
                            type="button"
                        >
                            {city.name}, {city.country}
                            {city.state ? `, ${city.state}` : ''}
                        </button>
                    ))}
                </div>
            )}

            {query.length >= 2 && cities.length === 0 && !loading && (
                <div className="search-dropdown">
                    <div className="no-results">No cities found</div>
                </div>
            )}
        </div>
    );
};

export default CitySearch;