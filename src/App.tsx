import React, { useState, useEffect, useCallback } from 'react';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Forecast from './components/Forecast/Forecast';
import AirPollution from './components/AirPollution/AirPollution';
import CitySearch from './components/CitySearch/CitySearch';
import { weatherApi } from './services/weatherApi';
import { getWeatherGradient } from './utils/weatherStyles';
import { WeatherData, ForecastData, AirPollutionData, CityInfo } from './types/Weather';
import './App.css';

function App() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [pollution, setPollution] = useState<AirPollutionData | null>(null);
    const [currentCity, setCurrentCity] = useState<CityInfo>({
        name: 'Moscow',
        lat: 55.7558,
        lon: 37.6173,
        country: 'RU',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [weatherData, forecastData, pollutionData] = await Promise.all([
                weatherApi.getCurrentWeather(currentCity.lat, currentCity.lon),
                weatherApi.getForecast(currentCity.lat, currentCity.lon),
                weatherApi.getAirPollution(currentCity.lat, currentCity.lon),
            ]);

            setWeather(weatherData);
            setForecast(forecastData);
            setPollution(pollutionData);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [currentCity]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 3 * 60 * 60 * 1000);// refresh every 3 hours

        return () => clearInterval(interval);
    }, [fetchData]);

    const handleCitySelect = (city: CityInfo) => {
        console.log('City selected:', city);
        setCurrentCity(city);
        setWeather(null);
        setForecast(null);
        setPollution(null);
    };

    const getBackgroundStyle = () => {
        if (!weather) return {};
        const isNight = new Date().getHours() < 6 || new Date().getHours() > 20;
        return {
            background: getWeatherGradient(weather.weather[0].main, isNight),
            minHeight: '100vh',
            padding: '20px',
            transition: 'background 0.5s ease',
        };
    };

    if (loading && !weather) {
        return (
            <div className="app-loading">
                <div className="loading-spinner">Loading weather data...</div>
            </div>
        );
    }

    return (
        <div className="app" style={getBackgroundStyle()}>
            <div className="app-container">
                <CitySearch onCitySelect={handleCitySelect} />

                {error && <div className="error-message">{error}</div>}

                <div className="weather-grid">
                    {weather && <WeatherCard weather={weather} cityName={currentCity.name} />}
                    {forecast && <Forecast forecast={forecast} />}
                    {pollution && <AirPollution pollution={pollution} />}
                </div>

                <button onClick={fetchData} className="refresh-button" disabled={loading}>
                    {loading ? 'Updating...' : 'Refresh'}
                </button>
            </div>
        </div>
    );
}

export default App;