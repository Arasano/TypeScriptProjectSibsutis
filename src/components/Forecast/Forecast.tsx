import React from 'react';
import { ForecastData } from '../../types/Weather';
import { formatTemperature, formatDayName, roundToOneDecimal } from '../../utils/weatherStyles';
import './Forecast.css';

interface ForecastProps {
    forecast: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
    if (!forecast.list || forecast.list.length === 0) {
        return (
            <div className="forecast-container">
                <h3 className="forecast-title">7-Day Forecast</h3>
                <p className="forecast-empty">Forecast data not available</p>
            </div>
        );
    }

    const dailyForecast = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 7);

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

    return (
        <div className="forecast-container">
            <h3 className="forecast-title">7-Day Forecast</h3>
            <div className="forecast-list">
                {dailyForecast.map((item, index) => {
                    const weather = item.weather[0];
                    const date = new Date(item.dt * 1000);

                    return (
                        <div key={index} className="forecast-item">
              <span className="forecast-day">
                {formatDayName(item.dt)}
              </span>
                            <span className="forecast-emoji">
                {getWeatherEmoji(weather.icon)}
              </span>
                            <span className="forecast-temp">
                {formatTemperature(item.main.temp_min)} / {formatTemperature(item.main.temp_max)}
              </span>
                            <span className="forecast-humidity">
                {roundToOneDecimal(item.pop * 100)}%
              </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Forecast;