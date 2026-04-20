import React, { useState, useEffect } from 'react';
import { WeatherData } from '../../types/Weather';
import { formatTemperature, formatTime, formatDate, roundToOneDecimal } from '../../utils/weatherStyles';
import './WeatherCard.css';

interface WeatherCardProps {
    weather: WeatherData;
    cityName: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, cityName }) => {
    const { main, weather: weatherInfo, wind, sys, name } = weather;
    const currentWeather = weatherInfo[0];
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const getWeatherEmoji = (iconCode: string): string => {
        const emojiMap: Record<string, string> = {
            '01d': '☀️',
            '01n': '🌙',
            '02d': '⛅',
            '02n': '☁️',
            '03d': '☁️',
            '03n': '☁️',
            '04d': '☁️',
            '04n': '☁️',
            '09d': '🌧️',
            '09n': '🌧️',
            '10d': '🌦️',
            '10n': '🌦️',
            '11d': '⛈️',
            '11n': '⛈️',
            '13d': '🌨️',
            '13n': '🌨️',
            '50d': '🌫️',
            '50n': '🌫️',
        };
        return emojiMap[iconCode] || '🌡️';
    };

    useEffect(() => {
        setImageLoaded(false);
        setImageError(false);
    }, [currentWeather.icon]);

    return (
        <div className="weather-card">
            <div className="weather-header">
                <h2 className="city-name">{cityName || name}</h2>
                <p className="weather-date">{formatDate(weather.dt)}</p>
            </div>

            <div className="weather-main">
                <div className="temperature">
                    <span className="temp-value">{formatTemperature(main.temp)}</span>
                    <span className="temp-feels">Feels like {formatTemperature(main.feels_like)}</span>
                </div>

                <div className="weather-icon-container">
                    {!imageError ? (
                        <img
                            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
                            alt={currentWeather.description}
                            className="weather-icon-large"
                            onLoad={() => {
                                console.log('Image loaded:', currentWeather.icon);
                                setImageLoaded(true);
                            }}
                            onError={() => {
                                console.log('Image error, showing emoji:', currentWeather.icon);
                                setImageError(true);
                            }}
                        />
                    ) : (
                        <span className="emoji-fallback">
              {getWeatherEmoji(currentWeather.icon)}
            </span>
                    )}
                </div>

                <p className="weather-description">{currentWeather.description}</p>
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">{main.humidity}%</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Wind</span>
                    <span className="detail-value">{roundToOneDecimal(wind.speed)} m/s</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">{main.pressure} hPa</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Sunrise</span>
                    <span className="detail-value">{formatTime(sys.sunrise)}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Sunset</span>
                    <span className="detail-value">{formatTime(sys.sunset)}</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;